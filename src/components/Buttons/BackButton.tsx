import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ButtonIcon from 'react-native-vector-icons/FontAwesome5';
import { verticalScale } from '../../utils/Dimentions';
import { Colors } from '../../constants';

const BackButton = ({onBackBtnPress}:any) => {
  return (
    <TouchableOpacity
      onPress={onBackBtnPress}
      style={styles.backArrowContainer}>
      <ButtonIcon name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backArrowContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: verticalScale(50),
    width: verticalScale(50),
    justifyContent: 'center',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 7,
    marginVertical: verticalScale(5),
    elevation: 10,
    shadowOpacity: 0.9,
  },
});
