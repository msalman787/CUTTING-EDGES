import React, {useState} from 'react';
import {
  View,
  Button,
  Linking,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors, Fonts, Images} from '../../constants';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Entypo';

const PackageCards = ({
  id,
  imageLink,
  admin_id,
  title,
  google_map_link,
  description,
  location,
  price,
  image,
  admin,
  onRemovePackage,
  onPress,
}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        {!imageLink ? (
          <Image source={image} style={styles.image} resizeMode="cover" />
        ) : (
          <Image
            source={{uri: imageLink}}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.titleDescriptionContainer}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="package" size={22} color="black" />
            <Text style={[styles.description, {marginTop: 3, marginLeft: 5}]}>
              {title}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon3 name="text-document" size={20} color="black" />
            <Text style={[styles.description, {marginTop: 3, marginLeft: 5}]}>
              {description}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon3 name="home" size={20} color="black" />
            <Text style={[styles.description, {marginTop: 3, marginLeft: 5}]}>
              {location}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon3 name="location" size={20} color="black" />
            <Text style={[styles.description, {marginTop: 3, marginLeft: 5}]}>
              {google_map_link}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      {admin ? (
        <View style={styles.rowContainer}>
          <Text style={[styles.phoneNo, {marginTop: 5}]}>Rs: {price}</Text>
          <TouchableOpacity
            style={[styles.button,{backgroundColor:"rgba(255, 226, 226, 1)"}]}
            onPress={() => onRemovePackage(id)}>
            <Text style={[styles.buttonText,{color:'rgba(255, 65, 65, 1)'}]}>Remove Package</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.rowContainer}>
          <Text style={[styles.phoneNo, {marginTop: 5}]}>Rs: {price}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(id, admin_id)}>
            <Text style={styles.buttonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  titleDescriptionContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  icon: {
    marginRight: 3,
  },
  description: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'rgba(105, 119, 132, 1)',
  },
  horizontalBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    marginVertical: 10,
  },
  phoneNo: {
    flex: 1,
    fontSize: 14,
    marginLeft: 5,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'rgba(105, 119, 132, 1)',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.DEFAULT_BLACK,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 12,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});

export default PackageCards;
