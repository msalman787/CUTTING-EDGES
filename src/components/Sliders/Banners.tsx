import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import {horizontalScale, verticalScale} from '../../utils/Dimentions';
import { Colors } from '../../constants';

const Banners = ({images}:any) => {

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        autoplay={true} // Set to true for automatic sliding
        autoplayTimeout={4} // Time in seconds for each slide
        dotStyle={styles.dot} // Customize the inactive dot style
        activeDotStyle={styles.activeDot} // Customize the active dot style
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
    height: verticalScale(150),
    // paddingHorizontal: horizontalScale(10),
    paddingTop: verticalScale(10),
  },
  swiper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: horizontalScale(360),
    height: verticalScale(130),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: Colors.DEFAULT_WHITE,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});

export default Banners;
