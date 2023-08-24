import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import {horizontalScale, verticalScale} from '../../utils/Dimentions';
import { Colors } from '../../constants';

const DetailSlider = ({images}:any) => {

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        autoplay={true} 
        autoplayTimeout={4}
        dotStyle={styles.dot} 
        activeDotStyle={styles.activeDot} 
      >
        {images && images.map((image:any, index:number) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(250),
    borderRadius:10,
    elevation: 5,
    shadowOpacity: 0.9,
  },
  swiper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: Colors.DEFAULT_BLACK,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default DetailSlider;
