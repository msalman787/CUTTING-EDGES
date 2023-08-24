import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { DynamicStatusBar } from '../../../components';
import { Colors } from '../../../constants';

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <DynamicStatusBar/>
      <Image
        source={require('../../../assets/images/Splash.jpg')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;
