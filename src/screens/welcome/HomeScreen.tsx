import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../constants';
import {HeaderWithSearchInput} from '../../components';

const HomeScreen = ({navigation}: any) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderWithSearchInput titleStyle={50} title="CUTTING EDGES" />
      </View>
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/banner.jpg')}
          style={[styles.image1]}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen');
          }}>
          <Image  
            source={require('../../assets/images/new-look1.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Hair Cut / Bread</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen');
          }}>
          <Image
            source={require('../../assets/images/groom.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Groom Packages</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen');
          }}>
          <Image
            source={require('../../assets/images/massage.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Massage</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen');
          }}>
          <Image
            source={require('../../assets/images/facial.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Facial</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    height: 220,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 8,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image1: {
    flex: 1,
    width: '100%',
    height: 250,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 120,
    marginBottom: 8,
    borderRadius: 10,
    marginVertical: 20,
  },
  text: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DEFAULT_BLACK,
    marginBottom: 10,
  },
});
