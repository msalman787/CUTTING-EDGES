import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {horizontalScale} from '../../utils/Dimentions';
import LargeButton from '../Buttons/Button';
import StarRating from 'react-native-star-rating-widget';

const RattingModal = ({
  isVisible,
  ratingValue,
  setRatingValue,
  onPress,
}: any) => {
    console.log({isVisible})
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      >
      <TouchableOpacity style={styles.modalContainer} >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Review</Text>
          <Text style={styles.description}>
           Rate your previous appointment experience.
          </Text>
          <StarRating rating={ratingValue} onChange={setRatingValue} />
          <TouchableOpacity style={{height: 50, width: 320, marginTop: 10}}>
            <LargeButton onPress={onPress} text={'Save'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.DEFAULT_WHITE,
    marginHorizontal: horizontalScale(10),
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.LIGHT_GRAY,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default RattingModal;
