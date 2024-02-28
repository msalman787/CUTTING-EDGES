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
import {SelectList} from 'react-native-dropdown-select-list';
import {Checkbox} from 'react-native-paper';

const NewAppointment = ({navigation, route}: any) => {
  const {package_id, admin_id} = route.params;
  const [showModel, setShowModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState({
    simple: '',
  });
  const [selected, setSelected] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const data = [
    {value: 'haircuts', key: 'Hair Cut / Beard'},
    {value: 'grooms', key: 'Groom'},
    {value: 'massage', key: 'Massage'},
    {value: 'faicials', key: 'Faicial'},
  ];
  const [maleChecked, setMaleChecked] = useState(true);
  const [femaleChecked, setFemaleChecked] = useState(false);

  const handleMaleChange = () => {
    setMaleChecked(!maleChecked);
    setFemaleChecked(false);
  };

  const handleFemaleChange = () => {
    setFemaleChecked(!femaleChecked);
    setMaleChecked(false);
  };
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

  const handleGoback = () => {
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
  const HomeRedirect = async () => {
    await navigation.navigate('HomeScreen');
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
      data.others = selected;
      data.gender = maleChecked ? 'Male' : 'Female';
      setDisabled(!disabled);

      const response = await apiResponseGenerator({
        url: 'api/addappointment',
        method: 'post',
        body: data,
      });
      if (response.success) {
        setState(prevState => ({
          ...prevState,
          image: '',
          bgColor: 'rgba(41, 172, 68, 1)',
          title: 'Success',
          description: 'Your appointment has been created.',
          isValidate: !prevState.isValidate,
        }));

        setDisabled(!disabled);
      } else {
        dispatch(showModal({description: response.message}));
        setDisabled(!disabled);
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
      setDisabled(!disabled);
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
        onPageRedirect={
          state.title == 'Success' ? handleGoback : handleHideModal
        }
      />
      {/* Image Picker Model */}
      <Modal animationType="fade" transparent={true} visible={showModel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modelButtons}>
              {/* <LargeButton
                onPress={choosePhotoFromLibrary}
                colorChanger={true}
                text={'Upload Photo'}
              /> */}
            </View>
            <View style={[styles.modelButtons, {paddingVertical: 70}]}>
              <LargeButton
                onPress={handleCaptureImage}
                colorChanger={true}
                text={'Take Photo'}
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
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => setSelectedImage('1')}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            style={[
              styles.hairImage,
              {
                borderWidth: selectedImage == '1' ? 4 : 2,
                borderColor: selectedImage == '1' ? 'green' : 'grey'},
            ]}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage('2')}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            style={[
              styles.hairImage,
              {
                borderWidth: selectedImage == '2' ? 4 : 2,
                borderColor: selectedImage == '2' ? 'green' : 'grey'},
            ]}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedImage('3')}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,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',
            }}
            style={[
              styles.hairImage,
              {
                borderWidth: selectedImage == '3' ? 4 : 2,
                borderColor: selectedImage == '3' ? 'green' : 'grey'},
            ]}
            resizeMode="cover"
          />
        </TouchableOpacity>

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

        {/* <View style={styles.input}>
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
        </View> */}
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
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Gender</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              color={Colors.DEFAULT_BLACK}
              status={maleChecked ? 'checked' : 'unchecked'}
              onPress={handleMaleChange}
            />
            <Text>Male</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox
              color={Colors.DEFAULT_BLACK}
              status={femaleChecked ? 'checked' : 'unchecked'}
              onPress={handleFemaleChange}
            />
            <Text>Female</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20,
          }}>
          <SelectList
            placeholder="Select more packages"
            setSelected={(val: any) => {
              setSelected(val);
            }}
            data={data}
            save="value"
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
        <View style={{marginHorizontal: 10}}>
          <LargeButton
            disabled={disabled}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 1,
    color: Colors.DEFAULT_WHITE,
    backgroundColor: Colors.DEFAULT_BLACK,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 10,
  },
  hairImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
    borderColor: Colors.DEFAULT_BLACK,
    borderWidth: 2,
  },
});
