import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
  commentText,
  setCommentText,
}: any) => {

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <TouchableOpacity style={styles.modalContainer}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Review</Text>
          <Text style={styles.description}>
            Rate your previous appointment experience.
          </Text>
          <StarRating rating={ratingValue} onChange={setRatingValue} />
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            multiline={true}
            value={commentText}
            onChangeText={text => setCommentText(text)}
          />
          <TouchableOpacity style={{height: 50, width: 320, marginTop: 10}}>
            <LargeButton
              onPress={() => onPress(ratingValue, commentText)}
              text={'Save'}
            />
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
    marginVertical: 10
  },
  commentInput: {
    fontFamily: Fonts.POPPINS_REGULAR,
    height: 50,
    width: 320,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

export default RattingModal;
