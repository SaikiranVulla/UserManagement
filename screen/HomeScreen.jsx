import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../redux/userSlice';

const userData = [
  {
    gender: 'female',
    name: {
      title: 'Mrs',
      first: 'Aya',
      last: 'Sundal',
    },
    location: {
      street: {
        number: 6041,
        name: 'Moserabben',
      },
      city: 'Sylling',
      state: 'Nord-Trøndelag',
      country: 'Norway',
      postcode: '9266',
      coordinates: {
        latitude: '47.1001',
        longitude: '82.4326',
      },
      timezone: {
        offset: '+1:00',
        description: 'Brussels, Copenhagen, Madrid, Paris',
      },
    },
    email: 'aya.sundal@example.com',
    login: {
      uuid: '2d6799d7-801f-4890-b315-6383559a144d',
      username: 'greengorilla313',
      password: 'aaaa',
      salt: 'af0FJaTo',
      md5: '78ee96d2d678fbee7aec462478fbd11e',
      sha1: '6761508f1f370f1bc53c65b70b8e12b63691e058',
      sha256:
        'e9d3ae8dda69eb3d6c07513df3f4f8adefac6a01accda45dd25fe2af48d5d65c',
    },
    dob: {
      date: '1974-07-24T01:17:03.026Z',
      age: 50,
    },
    registered: {
      date: '2006-09-13T14:12:13.368Z',
      age: 18,
    },
    phone: '35612284',
    cell: '40269971',
    id: {
      name: 'FN',
      value: '24077448094',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/31.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/31.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/31.jpg',
    },
    nat: 'NO',
  },
  {
    gender: 'female',
    name: {
      title: 'Ms',
      first: 'Venla',
      last: 'Hokkanen',
    },
    location: {
      street: {
        number: 1136,
        name: 'Esplanadi',
      },
      city: 'Mikkeli',
      state: 'Åland',
      country: 'Finland',
      postcode: 78157,
      coordinates: {
        latitude: '-14.8223',
        longitude: '-74.2486',
      },
      timezone: {
        offset: '0:00',
        description: 'Western Europe Time, London, Lisbon, Casablanca',
      },
    },
    email: 'venla.hokkanen@example.com',
    login: {
      uuid: '049fec3b-0f68-4f2c-b118-fcdd44819e76',
      username: 'greenmouse232',
      password: 'jingle',
      salt: '11qqIfL4',
      md5: '37340c4b112e06fafd633270c4f6a12d',
      sha1: '1b53d116e4fa18574aa03f38dfe77461cb66529f',
      sha256:
        'a50790570b1686776541a929507a73dea3d68f716cda9c496635fe6f75c2ec1f',
    },
    dob: {
      date: '1986-07-21T03:06:30.689Z',
      age: 38,
    },
    registered: {
      date: '2008-09-22T01:28:17.547Z',
      age: 16,
    },
    phone: '02-582-130',
    cell: '045-883-31-90',
    id: {
      name: 'HETU',
      value: 'NaNNA072undefined',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/85.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/85.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/85.jpg',
    },
    nat: 'FI',
  },
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'محمدامين',
      last: 'رضاییان',
    },
    location: {
      street: {
        number: 2514,
        name: 'مالک اشتر',
      },
      city: 'زنجان',
      state: 'فارس',
      country: 'Iran',
      postcode: 62681,
      coordinates: {
        latitude: '22.2149',
        longitude: '-127.0753',
      },
      timezone: {
        offset: '+10:00',
        description: 'Eastern Australia, Guam, Vladivostok',
      },
    },
    email: 'mhmdmyn.rdyyn@example.com',
    login: {
      uuid: 'b5e08d42-508d-4d56-af10-b390c3f49779',
      username: 'redelephant457',
      password: 'patricia',
      salt: 'l6OzjSUF',
      md5: 'dcedd6e091401a6a67df3e87299ae210',
      sha1: '9e6fe998883cea8ded68d0cd7af4a619551e901e',
      sha256:
        '9b7c05b2bd79e5fada421516e5274fbd4f332b734f5f6758e78c2e3c172ed326',
    },
    dob: {
      date: '1995-02-06T20:11:31.660Z',
      age: 29,
    },
    registered: {
      date: '2016-06-24T17:53:54.125Z',
      age: 8,
    },
    phone: '052-83277623',
    cell: '0914-293-0825',
    id: {
      name: '',
      value: null,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/63.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/63.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/63.jpg',
    },
    nat: 'IR',
  },
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Undine',
      last: 'Hendricks',
    },
    location: {
      street: {
        number: 6713,
        name: 'Am Sportplatz',
      },
      city: 'Rehau',
      state: 'Hessen',
      country: 'Germany',
      postcode: 89357,
      coordinates: {
        latitude: '-57.9608',
        longitude: '155.6744',
      },
      timezone: {
        offset: '-2:00',
        description: 'Mid-Atlantic',
      },
    },
    email: 'undine.hendricks@example.com',
    login: {
      uuid: 'a62bb8aa-36eb-4a84-954c-cb35164e51c3',
      username: 'smallostrich798',
      password: 'women',
      salt: 'KQBSZeqy',
      md5: '108ef9813d97885dde9bea827dada99b',
      sha1: 'adf20966078eba2b9b899e692226ce8f49379822',
      sha256:
        '28f8215e118a8c335c2cca856a2abc479f5854e19f73fe59cd683ffa7721ea44',
    },
    dob: {
      date: '1989-06-07T02:56:13.134Z',
      age: 35,
    },
    registered: {
      date: '2004-06-24T20:27:53.778Z',
      age: 20,
    },
    phone: '0142-8865905',
    cell: '0178-3867130',
    id: {
      name: 'SVNR',
      value: '63 060689 H 809',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/5.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/5.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/5.jpg',
    },
    nat: 'DE',
  },
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Jonathan',
      last: 'Reyes',
    },
    location: {
      street: {
        number: 5717,
        name: 'Avenida de Castilla',
      },
      city: 'Málaga',
      state: 'País Vasco',
      country: 'Spain',
      postcode: 18500,
      coordinates: {
        latitude: '13.2013',
        longitude: '-108.3140',
      },
      timezone: {
        offset: '-7:00',
        description: 'Mountain Time (US & Canada)',
      },
    },
    email: 'jonathan.reyes@example.com',
    login: {
      uuid: 'df556a0b-6e9b-47bd-946f-cacc10363eca',
      username: 'bigrabbit756',
      password: 'dotcom',
      salt: 'S0ezkBrD',
      md5: '9e76668a2317a0f8e47ec427435daa81',
      sha1: 'a681c8fcfb121e060961d6a84de19ec91acc33ee',
      sha256:
        '8109ea0c03f346defd3e62ea1904e047399ed612593ab34f012124655072aa8d',
    },
    dob: {
      date: '1957-09-09T22:29:21.152Z',
      age: 67,
    },
    registered: {
      date: '2016-01-04T20:17:41.754Z',
      age: 8,
    },
    phone: '922-795-370',
    cell: '652-099-349',
    id: {
      name: 'DNI',
      value: '90613039-X',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/57.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/57.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/57.jpg',
    },
    nat: 'ES',
  },
  {
    gender: 'female',
    name: {
      title: 'Ms',
      first: 'Tracey',
      last: 'Lambert',
    },
    location: {
      street: {
        number: 182,
        name: 'Mcgowen St',
      },
      city: 'Raleigh',
      state: 'Louisiana',
      country: 'United States',
      postcode: 92711,
      coordinates: {
        latitude: '2.8390',
        longitude: '171.1954',
      },
      timezone: {
        offset: '+11:00',
        description: 'Magadan, Solomon Islands, New Caledonia',
      },
    },
    email: 'tracey.lambert@example.com',
    login: {
      uuid: '19e6dab2-60b9-4e51-9c29-18e1bf162747',
      username: 'goldenzebra454',
      password: 'yang',
      salt: 'vZeG48JR',
      md5: '993079ceeff1403f490225702a6ccdb8',
      sha1: 'e7b4dfcb40b702ab82feb68184703a2e143c4ea8',
      sha256:
        '4232668163b75c1a24db12e33361a523b897b8210f02402e0442dbb480d3f82e',
    },
    dob: {
      date: '1992-05-07T15:57:13.079Z',
      age: 32,
    },
    registered: {
      date: '2013-02-13T10:24:51.794Z',
      age: 11,
    },
    phone: '(361) 759-7101',
    cell: '(584) 739-7268',
    id: {
      name: 'SSN',
      value: '105-30-9194',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/1.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/1.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
    },
    nat: 'US',
  },
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Oscar',
      last: 'Meyer',
    },
    location: {
      street: {
        number: 6578,
        name: 'Rue Denfert-Rochereau',
      },
      city: 'Perpignan',
      state: 'Doubs',
      country: 'France',
      postcode: 39437,
      coordinates: {
        latitude: '-34.5565',
        longitude: '-139.1977',
      },
      timezone: {
        offset: '-3:30',
        description: 'Newfoundland',
      },
    },
    email: 'oscar.meyer@example.com',
    login: {
      uuid: 'cb3a933c-f85b-4184-8ff5-6ef1a1506fef',
      username: 'redlion825',
      password: 'enforcer',
      salt: 'IkmNQ4OR',
      md5: '84397eca4897045d1fd22a87acf0bc70',
      sha1: '7a44665bbfc918715b0874b3e7f7553dd412ddbe',
      sha256:
        '6f429fd7ae929aa25283bd764f18e23080798157c0d10052efe039f03e38a843',
    },
    dob: {
      date: '1947-01-31T16:31:13.161Z',
      age: 77,
    },
    registered: {
      date: '2007-03-30T16:32:19.331Z',
      age: 17,
    },
    phone: '02-29-04-27-88',
    cell: '06-97-10-73-99',
    id: {
      name: 'INSEE',
      value: '1470063378956 43',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/76.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/76.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/76.jpg',
    },
    nat: 'FR',
  },
  {
    gender: 'male',
    name: {
      title: 'Monsieur',
      first: 'Yusuf',
      last: 'Garcia',
    },
    location: {
      street: {
        number: 907,
        name: 'Rue de Cuire',
      },
      city: 'Onnens (Vd)',
      state: 'Nidwalden',
      country: 'Switzerland',
      postcode: 3842,
      coordinates: {
        latitude: '8.1285',
        longitude: '159.7725',
      },
      timezone: {
        offset: '+4:30',
        description: 'Kabul',
      },
    },
    email: 'yusuf.garcia@example.com',
    login: {
      uuid: '8df07b5e-5d18-4ef9-bf5f-6d802a3a8eb2',
      username: 'lazyswan852',
      password: 'harrison',
      salt: 'kWZAzbRj',
      md5: 'e34e9497902a357cc2c26e0c45fe1726',
      sha1: 'a10561a5c4396b86ca06663185a1d9bdd54dafe4',
      sha256:
        '632c4548576858e3e75b7e983a3542074b5f9665e4ea1402dcfcd1c7b9d9d472',
    },
    dob: {
      date: '1982-07-21T14:39:48.813Z',
      age: 42,
    },
    registered: {
      date: '2013-06-26T08:01:09.806Z',
      age: 11,
    },
    phone: '078 113 63 98',
    cell: '077 518 87 30',
    id: {
      name: 'AVS',
      value: '756.1256.5339.33',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/63.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/63.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/63.jpg',
    },
    nat: 'CH',
  },
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'Robert',
      last: 'Jensen',
    },
    location: {
      street: {
        number: 8978,
        name: 'Queensway',
      },
      city: 'Manchester',
      state: 'Rutland',
      country: 'United Kingdom',
      postcode: 'G8 4RA',
      coordinates: {
        latitude: '-85.0074',
        longitude: '-110.8291',
      },
      timezone: {
        offset: '+9:00',
        description: 'Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
      },
    },
    email: 'robert.jensen@example.com',
    login: {
      uuid: '7c6b5ec3-ad10-4850-b2f6-63cb5aab3582',
      username: 'yellowlion562',
      password: 'golfer1',
      salt: 'rQvNHAce',
      md5: 'e75aca351789912f6544aefc5527b2eb',
      sha1: '39d3ced07e7b626572da1ae8125e82d366d413ec',
      sha256:
        'f1d68c14963054ae74efea3aa04564122e506d0c93cc1310908195a88431273a',
    },
    dob: {
      date: '1988-02-20T10:51:14.303Z',
      age: 36,
    },
    registered: {
      date: '2013-02-03T21:51:07.070Z',
      age: 11,
    },
    phone: '017684 76630',
    cell: '07260 085436',
    id: {
      name: 'NINO',
      value: 'LA 48 02 49 Y',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/44.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/44.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/44.jpg',
    },
    nat: 'GB',
  },
  {
    gender: 'male',
    name: {
      title: 'Monsieur',
      first: 'Vladimir',
      last: 'Schmitt',
    },
    location: {
      street: {
        number: 4863,
        name: 'Rue des Abbesses',
      },
      city: 'Zihlschlacht-Sitterdorf',
      state: 'Glarus',
      country: 'Switzerland',
      postcode: 9545,
      coordinates: {
        latitude: '-52.8430',
        longitude: '47.4254',
      },
      timezone: {
        offset: '-3:30',
        description: 'Newfoundland',
      },
    },
    email: 'vladimir.schmitt@example.com',
    login: {
      uuid: 'beab5a9c-03c3-43e1-a4cd-eec20c6eea45',
      username: 'tinyswan854',
      password: 'studman',
      salt: '4Tz9JUTY',
      md5: 'd941f429b2a1fb021d92b38a82db6c30',
      sha1: '304ff452a65fc423fc83a015d503fb787196f63c',
      sha256:
        '1707648e913cc4ca55bb5fcdc3973572bba59783508b8c0ab58d92a07b20abd0',
    },
    dob: {
      date: '1968-01-02T22:33:21.732Z',
      age: 56,
    },
    registered: {
      date: '2010-10-24T21:23:27.382Z',
      age: 14,
    },
    phone: '077 530 63 84',
    cell: '079 100 98 42',
    id: {
      name: 'AVS',
      value: '756.7795.8253.47',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/82.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/82.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/82.jpg',
    },
    nat: 'CH',
  },
];

const HomeScreen = () => {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.user);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log(userList);

  useEffect(() => {
    dispatch(getUser(pageNumber));
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
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
              <Address>
                : {item.location.street.number},{item.location.street.name}{' '}
                {item.location.city} {item.location.state}{' '}
                {item.location.country}
                {item.location.postcode}
              </Address>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const onPullToRefresh = () => {
    dispatch(getUser(1));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.subMainContainer}>
        <FlatList
          data={userData}
          keyExtractor={item => item.login.uuid}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={loadNextItems}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" /> : null
          }
          onRefresh={onPullToRefresh}
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
