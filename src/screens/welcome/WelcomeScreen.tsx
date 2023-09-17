import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, Images} from '../../constants';

const WelcomeScreen = ({navigation}: any) => {
  const handleNavigation = (name: string) => {
    navigation.navigate(name);
  };
  return (
    <View style={styles.container}>
      <Image source={Images.LOGO} style={styles.image} resizeMode="cover" />
      <TouchableOpacity
        onPress={() => {
          handleNavigation('SignInScreen');
        }}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: Colors.DEFAULT_WHITE,
            borderColor: Colors.DEFAULT_BLACK,
            borderWidth: 1,
          },
        ]}>
        <Text style={[styles.buttonText, {color: Colors.DEFAULT_BLACK}]}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleNavigation('HomeScreen');
        }}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  image: {
    width: 250,
    height: 250,
    marginRight: 16,
    borderRadius: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.DEFAULT_BLACK,
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    width: '70%',
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 18,
  },
});
