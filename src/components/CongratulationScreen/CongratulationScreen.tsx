import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import HeaderWithSearchInput from '../Header/HeaderWithInput';
import {Colors, Fonts} from '../../constants';
import {verticalScale} from '../../utils/Dimentions';

const CongratulationScreen = ({
  headerTitle,
  description,
  handleGoback,
  qrcodeValue,
}: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/radeem.jpg')}
        style={styles.image}>
        <View style={styles.header}>
          <HeaderWithSearchInput
            title={headerTitle}
            titleColor={true}
            onBackBtnPress={handleGoback}
            titleStyle={30}
          />
        </View>
      </ImageBackground>
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 10}}>
        <Text style={styles.text}>Congratulations!!</Text>
        <Text
          style={[
            styles.text,
            {
              fontSize: 16,
              fontFamily: Fonts.POPPINS_REGULAR,
              color: Colors.LIGHT_GRAY,
              textAlign: 'center',
            },
          ]}>
          {description}
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <QRCode value={qrcodeValue} size={220} />
      </View>
    </View>
  );
};

export default CongratulationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  image: {
    width: 'auto',
    height: verticalScale(330),
    resizeMode: 'cover',
  },
  text: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 20,
  },
});
