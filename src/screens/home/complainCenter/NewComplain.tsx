import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  AnimatedInput,
  DynamicStatusBar,
  HeaderWithSearchInput,
  LargeButton,
  ValidationModel,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
import {Controller, useForm} from 'react-hook-form';
import {newComplainScreenInputSchema} from '../../../validations/Complain';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

const NewComplain = ({navigation}: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'You can only added up to 3 images.',
    buttonText: 'Ok',
    isValidate: false,
  });

  const [images, setImages]: any = useState([]);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(newComplainScreenInputSchema),
  });

  const handleCloseInput = () => {
    navigation.goBack();
  };

  const handleCaptureImage = () => {
    if (images.length < 3) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(async (image: any) => {
          console.log(image);
          setShowModal(false);
          await setImages([...images, image]);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setState(prevState => ({
        ...prevState,
        isValidate: !prevState.isValidate,
      }));
      setShowModal(false);
      console.log('You can only capture up to 3 images.');
    }
  };

  const getFileNameFromPath = (path: any) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const choosePhotoFromLibrary = () => {
    if (images.length < 3) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: false,
      })
        .then(async (image: any) => {
          console.log(image);
          setShowModal(false);
          await setImages([...images, image]);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setState(prevState => ({
        ...prevState,
        isValidate: !prevState.isValidate,
      }));
      setShowModal(false);
    }
  };

  const handleHideModal = () => {
    setState(prevState => ({
      ...prevState,
      isValidate: !prevState.isValidate,
    }));
  };

  const onPageRedirect = async () => {
    await navigation.navigate('ComplainCenterScreen');
  };

  const HandleNewComplain = async (data: any) => {
    setState(prevState => ({
      ...prevState,
      title: 'Success',
      image: Images.SucessIcon,
      description: 'Your complain has submitted.',
      bgColor: 'rgba(41, 172, 68, 1)',
      isValidate: true,
    }));
    console.log(data);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Validation Model */}
      <ValidationModel
        isVisible={state.isValidate}
        modalImage={state.image}
        title={state.title}
        bgColor={state.bgColor}
        description={state.description}
        onClose={handleHideModal}
        buttonText={state.buttonText}
        onPageRedirect={onPageRedirect}
      />
      {/* Image Picker Model */}
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modelButtons}>
              <LargeButton
                onPress={handleCaptureImage}
                colorChanger={true}
                text={'Take Photo'}
              />
            </View>
            <View style={[styles.modelButtons, {paddingVertical: 70}]}>
              <LargeButton
                onPress={choosePhotoFromLibrary}
                colorChanger={true}
                text={'Upload Photo'}
              />
            </View>
            <View style={styles.modelButtons}>
              <LargeButton
                onPress={() => {
                  setShowModal(false);
                }}
                text={'Cancel'}
              />
            </View>
          </View>
        </View>
      </Modal>

      <DynamicStatusBar />

      <View style={styles.header}>
        <HeaderWithSearchInput
          title="New Complain"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Title"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Title?.message}
              />
            )}
            name="Title"
            defaultValue=""
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Description"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Description?.message}
              />
            )}
            name="Description"
            defaultValue=""
          />
        </View>
        <View style={styles.dashedBorder}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(true);
            }}
            style={{
              borderRadius: 10,
              alignItems: 'center',
              padding: 10,
            }}>
            <Images.UploadComplain />
            <Text style={styles.text}>Upload Jpeg, png</Text>
            <Text
              style={[styles.text, {color: Colors.LIGHT_GRAY, fontSize: 14}]}>
              Max size 2mb
            </Text>
          </TouchableOpacity>
        </View>
        {images.map((image: any, index: number) => (
          <View style={styles.imageContainer} key={index}>
            <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
              <View>
                <Image source={{uri: image.path}} style={styles.image} />
              </View>

              <TouchableOpacity style={styles.selectedImage} key={index}>
                <Text
                  key={index}
                  style={[
                    styles.text,
                    {
                      fontSize: 12,
                    },
                  ]}>
                  {getFileNameFromPath(image.path)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => handleRemoveImage(index)}>
                <Images.CloseIcon />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{marginHorizontal: 10}}>
          <LargeButton
            onPress={handleSubmit(HandleNewComplain)}
            text={'Submit'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewComplain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  subContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
  },
  input: {
    paddingHorizontal: 10,
    marginBottom: 5,
    width: '100%',
  },
  dashedBorder: {
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.INPUT_BORDER,
    marginVertical: 30,
    margin: 10,
  },
  text: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DEFAULT_BLACK,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
  },
  modalView: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    backgroundColor: Colors.BG_COLOR,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '35%',
    textAlignVertical: 'center',
  },
  modelButtons: {
    marginHorizontal: 10,
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
  },
  selectedImage: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '75%',
    marginLeft: 10,
    marginTop: 5,
  },
});
