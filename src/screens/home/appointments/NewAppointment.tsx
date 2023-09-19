import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {appointmentInputSchema} from '../../../validations/Appointment';
import apiResponseGenerator from '../../../service/apiGenerator';
import {useDispatch} from 'react-redux';
import {showModal} from '../../../store/model/modelSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const NewAppointment = ({navigation, route}: any) => {
  const {package_id, admin_id} = route.params;
  const [showModel, setShowModal] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState({
    simple: '',
  });

  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'You can only added up to 3 images.',
    buttonText: 'Ok',
    isValidate: false,
  });

  const [images, setImages]: any = useState();
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

  const getCustomerId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customer');
      if (jsonValue) {
        return jsonValue;
      }
      return null;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
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

  const choosePhotoFromLibrary = () => {
    if (!images) {
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
    if (!date.simple) {
      return setState(prevState => ({
        ...prevState,
        isValidate: !prevState.isValidate,
        description: 'Appointment date time is required feild.',
      }));
    }
    try {
      data.descsion = 'pending';
      data.appointment_date_time = date?.simple;
      data.hair_style = images?.path || '';
      data.customer_id = await getCustomerId();
      data.package_id = package_id.toString();
      data.admin_id = admin_id.toString();
      const response = await apiResponseGenerator({
        url: 'api/addappointment',
        method: 'post',
        body: data,
      });
      if (response.success) {
        return handleCloseInput();
      } else {
        dispatch(showModal({description: response.message}));
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const convertToCustomFormat = (inputDateTime: string) => {
    const date = new Date(inputDateTime);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours: any = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amOrPm = date.getHours() < 12 ? 'AM' : 'PM';

    const formattedDate = `${month}/${day}/${year} ${
      hours % 12 || 12
    }:${minutes} ${amOrPm}`;

    return formattedDate;
  };
  const handleConfirmDate = (data: any) => {
    setDate(prevState => ({
      ...prevState,
      simple: convertToCustomFormat(data),
    }));
    hideDatePicker();
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
          onBackBtnPress={onPageRedirect}
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
                leftIcon={'text-account'}
                errorMsg={errors.first_name?.message}
              />
            )}
            name="first_name"
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
                leftIcon={'text-account'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.last_name?.message}
              />
            )}
            name="last_name"
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
                leftIcon={'email'}
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
                leftIcon={'phone'}
                keyboardType={'phone-pad'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.mobile_number?.message}
              />
            )}
            name="mobile_number"
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
                leftIcon={'home'}
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
                leftIcon={'human'}
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
          <TouchableOpacity onPress={showDatePicker}>
            <AnimatedInput
              label="Appointment date time"
              leftIcon={'calendar'}
              editable={false}
              value={date?.simple}
            />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        {/* <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Appointment date time"
                leftIcon={'calendar'}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.appointment_date_time?.message}
              />
            )}
            name="appointment_date_time"
            defaultValue=""
          />
        </View> */}
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
        <View style={{marginHorizontal: 10}}>
          <LargeButton onPress={handleSubmit(HandleNewAppo)} text={'Submit'} />
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
