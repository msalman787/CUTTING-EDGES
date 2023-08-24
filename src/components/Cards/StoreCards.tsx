import React, {useState} from 'react';
import {
  View,
  Button,
  Linking,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images} from '../../constants';

const StoreCards = ({title, description, phone, image}: any) => {
  const StoreImage = image;
  
  const location = {
    latitude: 25.37821,
    longitude: 68.36633,
    name: 'Latifabad Unit No. 7 Block D',
    address: 'Hyderabad, Sindh 71000, Pakistan',
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <StoreImage style={styles.image} resizeMode="cover" />
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Images.LocationIcon style={styles.icon} resizeMode="cover" />
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View style={styles.rowContainer}>
        <Images.PhoneIcon resizeMode="cover" />
        <Text style={styles.phoneNo}>{phone}</Text>
        <TouchableOpacity style={styles.button} onPress={openGoogleMaps}>
          <Text style={styles.buttonText}>Directions</Text>
        </TouchableOpacity>
      </View>
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
    width: 60,
    height: 60,
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
    fontSize: 12,
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

export default StoreCards;
