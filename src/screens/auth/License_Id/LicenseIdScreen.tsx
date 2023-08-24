import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Images} from '../../../constants';
import Header from '../../../components/Header/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LargeButton from '../../../components/Buttons/Button';
import ImagePicker from 'react-native-image-crop-picker';

const LicenseIdScreen = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const takePhotoFromCamera = async () => {
    const image: any = await ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: false,
    }).then(image => {
      console.log(image);
      setShowModal(false);
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: false,
    }).then(image => {
      console.log(image);
      setShowModal(false);
    });
  };
  return (
    <View style={styles.container}>
      <Header
        mainHeaderText={'License & Id'}
        subHeaderText={'Choose your document to verify your identity'}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          paddingVertical: 20,
        }}>
        <View style={{height: '40%'}}>
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => {
              setShowModal(true);
            }}>
            <Images.Identity style={styles.icon} />
            <View style={styles.cardText}>
              <Text style={styles.cardText}>Identity Card</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContainer}>
            <Images.License style={styles.icon} />
            <View style={styles.cardText}>
              <Text style={styles.cardText}>License</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}></View>
        <LargeButton colorChanger={true} text={'Submit'} />
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LargeButton
              onPress={() => {
                takePhotoFromCamera;
              }}
              colorChanger={true}
              text={'Take Photo'}
            />
            <LargeButton
              onPress={() => {
                choosePhotoFromLibrary;
              }}
              colorChanger={true}
              text={'Upload Photo'}
            />

            <LargeButton
              onPress={() => {
                setShowModal(false);
              }}
              text={'Cancel'}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LicenseIdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  cardContainer: {
    backgroundColor: '#F8F8F8',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 10,
    marginVertical: 10,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    alignSelf: 'center',
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  btnContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#606F7E',
    opacity: 0.95,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '35%',
    textAlignVertical: 'center',
  },
});
