import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {horizontalScale, verticalScale} from '../../utils/Dimentions';
import LargeButton from '../Buttons/Button';

const ValidationModel = ({
  isVisible,
  onClose,
  title,
  description,
  buttonText,
  modalImage,
  onPageRedirect,
  bgColor,
}: any) => {
  const ModalImage = modalImage;
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: bgColor ? bgColor : 'rgba(255, 65, 65, 1)'},
          ]}
          onStartShouldSetResponder={() => true}>
          <ModalImage style={styles.image} />
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.description}>{description}</Text>
          <View style={{height: 50, width: 320, borderColor: 'pink'}}>
            <LargeButton
              colorChanger={true}
              onPress={bgColor ? onPageRedirect : onClose}
              text={buttonText}
            />
          </View>
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
    marginHorizontal: horizontalScale(10),
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical:5
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.DEFAULT_WHITE,
  },
  description: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DEFAULT_WHITE,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ValidationModel;
