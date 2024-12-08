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
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, clearUsers} from '../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, loading} = useSelector(state => state.user);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredValue, setFilteredValue] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    dispatch(getUser(pageNumber));
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    if (isOffline) {
      loadCachedUsers();
    } else {
      cacheUsers(user);
    }

    return () => unsubscribe();
  }, [user, isOffline]);

  const handleSearch = () => {
    if (filteredValue) {
      let filterUser = user.filter(user =>
        user.location.country
          .toLowerCase()
          .includes(filteredValue.toLowerCase().trim()),
      );
      setFilteredUsers(filterUser);
    } else {
      setFilteredUsers(user);
    }
  };

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
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 6,
            marginTop: 10,
          }}>
          <View style={{flex: 0.4}}>
            <Image
              style={{
                flex: 1,
                width: '100%',
                aspectRatio: 1,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              }}
              source={{uri: item.picture.large}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 0.6, padding: 6, justifyContent: 'center'}}>
            <Text>
              Name: {item.name.first} {item.name.last}
            </Text>
            <Text>Phone: {item.phone}</Text>
            <Text>
              Address : {item.location.street.number},
              {item.location.street.name}, {item.location.city}{' '}
              {item.location.state}, {item.location.country},
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
      setPageNumber(pageNumber + 1);
    }
  };

  const renderFoot = () => {
    return (
      <View style={{paddingBottom: 100}}>
        {loading ? <ActivityIndicator size="large" /> : null}
      </View>
    );
  };

  const handleRefresh = async () => {
    setPageNumber(1);
    setFilteredValue('');
    setRefreshing(true);
    dispatch(clearUsers());
    dispatch(getUser(1));
    setRefreshing(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.subMainContainer}>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <TextInput
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 5,
                width: '80%',
                marginRight: 5,
              }}
              placeholder="Filter by country"
              placeholderTextColor={'gray'}
              value={filteredValue}
              onChangeText={value => {
                setFilteredUsers([]);
                setFilteredValue(value);
              }}
            />
            <Button title="Search" onPress={() => handleSearch()} />
          </View>
          {!filteredValue && !isOffline ? (
            <FlatList
              data={user}
              keyExtractor={item => item.login.uuid}
              renderItem={renderItem}
              onEndReachedThreshold={0.1}
              onEndReached={loadNextItems}
              ListFooterComponent={renderFoot}
              onRefresh={handleRefresh}
              refreshing={refreshing}
              scrollEventThrottle={16}
              contentInsetAdjustmentBehavior="automatic"
            />
          ) : (
            <FlatList
              data={filteredUsers}
              keyExtractor={item => item.login.uuid}
              renderItem={renderItem}
              scrollEventThrottle={16}
              contentInsetAdjustmentBehavior="automatic"
              ListFooterComponent={<View style={{paddingBottom: 100}} />}
            />
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
