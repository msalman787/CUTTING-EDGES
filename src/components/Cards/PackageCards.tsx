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
import StarRating from 'react-native-star-rating-widget';

const PackageCards = ({
  id,
  comment,
  ratingCount,
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
  deal,
  dealPrice,
}: any) => {
  const openGoogleMaps = (name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      name,
    )}`;
    Linking.openURL(url);
  };
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
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              openGoogleMaps(google_map_link);
            }}>
            <Icon3 name="location" size={20} color="black" />
            <Text style={[styles.description, {marginTop: 3, marginLeft: 5}]}>
              {google_map_link}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <Text style={styles.rate}>Package Rating:</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <StarRating starSize={20} rating={ratingCount} onChange={() => {}} />
          {ratingCount && <Text style={styles.rate}>{`(${ratingCount})`}</Text>}
        </View>
      </View>
      {admin && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={styles.rate}>Customer Comments:</Text>
          <Text style={[styles.description, {marginTop: 3, marginLeft: 5}]}>
            {comment}
          </Text>
        </View>
      )}
      {admin ? (
        <View style={[styles.rowContainer, {justifyContent: 'space-between'}]}>
          {dealPrice ? (
            <Text style={styles.rate}>
              Rs: <Text style={styles.oldrate}>{price}/</Text>
              {dealPrice}
            </Text>
          ) : (
            <Text style={styles.rate}>Rs: {price}</Text>
          )}
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'rgba(255, 226, 226, 1)'}]}
            onPress={() => onRemovePackage(id)}>
            <Text style={[styles.buttonText, {color: 'rgba(255, 65, 65, 1)'}]}>
              Remove Package
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={[
            styles.rowContainer,
            {
              justifyContent: 'space-between',
            },
          ]}>
          {/* <Text style={[styles.phoneNo, {marginTop: 5}]}>Rs: {price}</Text> */}
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            {deal == 'true' ? (
              <Text style={styles.rate}>
                Rs: <Text style={styles.oldrate}>{price}/</Text>
                {dealPrice}
              </Text>
            ) : (
              <Text style={styles.rate}>Rs: {price}</Text>
            )}
          </View>
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
  rate: {
    fontSize: 14,
    color: Colors.DEFAULT_BLACK,
    fontWeight: 'bold',
  },
  oldrate: {
    fontSize: 14,
    marginLeft: 10,
    color: 'red',
    textDecorationLine: 'line-through',
    fontWeight: 'bold',
  },
});

export default PackageCards;
