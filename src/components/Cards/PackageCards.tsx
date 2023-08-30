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

const PackageCards = ({id,title, description, price, image,onPress}: any) => {

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.title}>{title}</Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View style={styles.rowContainer}>
        <Text style={styles.phoneNo}>Price: {price}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>onPress(id)} >
          <Text style={styles.buttonText}>Book Appointment</Text>
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

export default PackageCards;
