import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {horizontalScale, verticalScale} from '../../utils/Dimentions';

const Header = ({
  mainHeaderText,
  subHeaderText,
  navigation,
  headerFontSize,
}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        {navigation && (
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        )}
        <View style={{flex: 1, width: horizontalScale(100)}}>
          <Text
            style={[
              styles.mainHeaderText,
              {
                fontSize: headerFontSize ? headerFontSize : 26,
              },
            ]}>
            {mainHeaderText}
          </Text>
        </View>
      </View>
      <Text style={[styles.subHeaderText, navigation && styles.bottomPadding]}>
        {subHeaderText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  container: {
    alignSelf: 'flex-start',
  },
  mainHeaderText: {
    marginTop: 22,
    fontSize: 26,
    alignSelf: 'flex-start',
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
  subHeaderText: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_LIGHT,
    color: Colors.LIGHT_GRAY,
    marginBottom: 20,
  },
  backArrowContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: verticalScale(50),
    width: verticalScale(50),
    marginTop: verticalScale(20),
    justifyContent: 'center',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    marginVertical: verticalScale(5),
    elevation: 5,
    shadowOpacity: 0.9,
  },
  bottomPadding: {
    marginTop: 25,
  },
});
export default Header;
