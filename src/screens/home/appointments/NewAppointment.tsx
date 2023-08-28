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
import { appointmentInputSchema } from '../../../validations/Appointment';
import apiResponseGenerator from '../../../service/apiGenerator';
import { useDispatch } from 'react-redux';
import { finishLoading, startLoading } from '../../../store/apiLoader/apiLoaderSlice';
import { showModal } from '../../../store/model/modelSlice';

const NewAppointment = ({navigation}: any) => {
  const [showModel, setShowModal] = useState<boolean>(false);
  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'You can only added up to 3 images.',
    buttonText: 'Ok',
    isValidate: false,
  });

  const [images, setImages]: any = useState([]);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(appointmentInputSchema),
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
    await navigation.goBack();
  };

  const HandleNewAppo = async (data: any) => {
    try {
      data.descsion="pending"
      data.customer_id= 1
      data.package_id= 2
      dispatch(startLoading());
      const response = await apiResponseGenerator({
        url: 'api/addappointment',
        method: 'post',
        body: data,
      });
      if (response) {
        dispatch(finishLoading());
        return handleCloseInput()
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
          title="New Appointment"
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
                label="First Name"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.firstName?.message}
              />
            )}
            name="firstName"
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
                label="Last Name"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.lastName?.message}
              />
            )}
            name="lastName"
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
                label="Email"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.email?.message}
              />
            )}
            name="email"
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
                label="Phone Number"
                keyboardType={'phone-pad'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.mobile_no?.message}
              />
            )}
            name="mobile_no"
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
                label="Address"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.address?.message}
              />
            )}
            name="address"
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
                label="Gender"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.gender?.message}
              />
            )}
            name="gender"
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
                label="Appointment date time"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.appointment_date_time?.message}
              />
            )}
            name="appointment_date_time"
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
            <Text style={styles.text}>Upload Hair Style Picture</Text>

          </TouchableOpacity>
        </View>
        {/* {images.map((image: any, index: number) => (
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
        ))} */}
        <View style={{marginHorizontal: 10}}>
          <LargeButton
            onPress={handleSubmit(HandleNewAppo)}
            text={'Submit'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default NewAppointment;

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
