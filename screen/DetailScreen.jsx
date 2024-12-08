import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React from 'react';

const DetailScreen = ({route}) => {
  const {detail} = route.params;
  console.log(detail);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 12,
          borderWidth: 1,
          borderRadius: 6,
        }}>
        <Image
          source={{uri: detail.picture.large}}
          resizeMode="cover"
          style={{
            alignSelf: 'center',
            width: '100%',
            aspectRatio: 1,
            marginTop: 10,
          }}
        />
        <View style={{marginVertical: 10, marginLeft: 10}}>
          <Text>
            Name:{detail.name.first} {detail.name.last}
          </Text>
          <Text>Phone Number:{detail.phone}</Text>
          <Text>
            Address: {detail.location.street.number},
            {detail.location.street.name}
          </Text>
          <Text>Country: {detail.location.country}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
