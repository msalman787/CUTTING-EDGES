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
import {yupResolver} from '@hookform/resolvers/yup';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {packageInputSchema} from '../../../validations/Package';
import apiResponseGenerator from '../../../service/apiGenerator';
import {useDispatch} from 'react-redux';
import {showModal} from '../../../store/model/modelSlice';

const NewPackage = ({navigation}: any) => {
  const [showModel, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'You can only added upto 1 image.',
    buttonText: 'Ok',
    isValidate: false,
  });

  const [images, setImages]: any = useState();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(packageInputSchema),
  });

  const handleCloseInput = () => {
    navigation.goBack();
  };

  const handleCaptureImage = () => {
    if (!images) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      })
        .then(async (image: any) => {
          console.log(image);
          setShowModal(false);
          await setImages(image);
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

  const choosePhotoFromLibrary = () => {
    if (!images) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: false,
      })
        .then(async (image: any) => {
          setShowModal(false);
          await setImages(image);
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
    await navigation.goBack();
  };

  const HandleNewPackage = async (data: any) => {
    try {
      data.image = images.path;
      const response = await apiResponseGenerator({
        url: 'api/addpricing',
        method: 'post',
        body: data,
      });
      if (response) {
        return handleCloseInput();
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
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
      <Modal animationType="fade" transparent={true} visible={showModel}>
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
          title="New Package"
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
                leftIcon={'format-title'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_title?.message}
              />
            )}
            name="Plan_title"
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
                leftIcon={'sticker-text'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_description?.message}
              />
            )}
            name="Plan_description"
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
                leftIcon={'currency-usd'}
                label="Price"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_price?.message}
              />
            )}
            name="Plan_price"
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
                label="Tag Line"
                leftIcon={'package'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.Plan_tag_line?.message}
              />
            )}
            name="Plan_tag_line"
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
            <Text style={styles.text}>Upload Package image</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 10}}>
          <LargeButton
            onPress={handleSubmit(HandleNewPackage)}
            text={'Submit'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewPackage;

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
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
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
