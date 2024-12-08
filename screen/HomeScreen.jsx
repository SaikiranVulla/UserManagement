import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, loading} = useSelector(state => state.user);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(user);
  const [filteredValue, setFilteredValue] = useState('');
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (filteredValue.trim()) {
      let filterUser = user.filter(
        user =>
          user.location.country.toLowerCase() == filteredValue.toLowerCase(),
      );
      setFilteredUsers(filterUser);
    } else {
      setFilteredUsers(user);
    }
  }, [filteredValue]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    if (isOffline) {
      loadCachedUsers();
    } else {
      dispatch(getUser(pageNumber));
      cacheUsers(user);
    }

    return () => unsubscribe();
  }, [isOffline]);

  const cacheUsers = async data => {
    try {
      await AsyncStorage.setItem('cachedUsers', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to cache users:', error);
    }
  };

  const loadCachedUsers = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('cachedUsers');
      if (cachedData) {
        setFilteredUsers(JSON.parse(cachedData));
      } else {
        setFilteredUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Detail', {detail: item})}
        style={{flex: 1}}>
        <View style={{flexDirection: 'row', borderWidth: 1, borderRadius: 6}}>
          <View style={{flex: 0.4}}>
            <Image
              style={{flex: 1}}
              source={{uri: item.picture.medium}}
              resizeMode="cover"
            />
          </View>
          <View style={{flex: 0.6, padding: 6}}>
            <Text>
              Name: {item.name.first} {item.name.last}
            </Text>
            <Text>Phone: {item.phone}</Text>
            <Text>
              Address : {item.location.street.number},
              {item.location.street.name} {item.location.city}{' '}
              {item.location.state} {item.location.country}
              {item.location.postcode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const loadNextItems = () => {
    if (!loading) {
      dispatch(getUser(pageNumber + 1));
    }
  };

  const renderFoot = () => {
    return loading ? <ActivityIndicator size="large" /> : null;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(getUser(1));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subMainContainer}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              padding: 10,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            }}
            placeholder="Filter by country"
            value={filteredValue}
            onChangeText={value => {
              setFilteredValue(value);
            }}
          />
        </View>
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.login.uuid}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={loadNextItems}
          ListFooterComponent={renderFoot}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  subMainContainer: {
    marginHorizontal: 12,
  },
});
