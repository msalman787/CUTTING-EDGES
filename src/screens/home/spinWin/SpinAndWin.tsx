import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  HeaderWithSearchInput,

} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import {horizontalScale, verticalScale} from '../../../utils/Dimentions';

const SpinAndWin = ({navigation}: any) => {
  const handleGoback = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={['#467BE9', '#467BE9', '#AC6FEC']}>
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="Spin & Win"
          titleColor={true}
          onBackBtnPress={handleGoback}
          titleStyle={30}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Spin the wheel for their chance to win prizes
        </Text>
        <View style={{flex: 8}}>
          
        </View>
      </View>
    </LinearGradient>
  );
};

export default SpinAndWin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    flexWrap: 'wrap',
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DEFAULT_WHITE,
    fontSize: 20,
  },
  contentContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1, 
  },
});
