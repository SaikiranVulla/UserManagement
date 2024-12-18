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
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser, clearUsers} from '../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from '../redux/userSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, loading, error} = useSelector(state => state.user);
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredValue, setFilteredValue] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    dispatch(getUser(pageNumber));
  }, []);

  // useEffect(() => {
  //   console.log('Loading offline users...');
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     setIsOffline(!state.isConnected);
  //   });

  //   if (isOffline) {
  //     loadCachedUsers();
  //   }

  //   return () => unsubscribe();
  // }, [user, isOffline]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = query => {
    if (query) {
      let filterUser = user.filter(
        user =>
          user.location.country
            .toLowerCase()
            .includes(query.toLowerCase().trim()) ||
          user.name.first.toLowerCase().includes(query.toLowerCase().trim()) ||
          user.name.last.includes(query.toLowerCase().trim()) ||
          user.phone.includes(query.trim()),
      );
      setFilteredUsers(filterUser);
    } else {
      setFilteredUsers(user);
    }
  };

  const loadCachedUsers = async () => {
    try {
      const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
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

  const checkRequest = NetInfo.addEventListener(state => {
    // console.log('Checking ...', state);
    // console.log('Checking ...>>', state.isConnected);
  });

  checkRequest();

  const debouncedSearch = useCallback(debounce(handleSearch, 1000), [user]);

  const BuggyComponent = () => {
    throw new Error('I crashed!');
  };

  console.log(error, 'error');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subMainContainer}>
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          <TextInput
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
              width: '100%',
              marginRight: 5,
            }}
            placeholder="Filter by Name, Phone, Country...."
            placeholderTextColor={'gray'}
            value={filteredValue}
            onChangeText={value => {
              setFilteredValue(value);
              debouncedSearch(value);
            }}
          />
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
      <BuggyComponent />
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
