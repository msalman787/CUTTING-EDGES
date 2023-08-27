import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header/Header';
import {Colors, Fonts, Images} from '../../../constants';
import AnimatedInput from '../../../components/Input/AnimatedInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {signUpScreenInputSchema} from '../../../validations/Signup';
import LargeButton from '../../../components/Buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import apiResponseGenerator from '../../../service/apiGenerator';
import {ValidationModel} from '../../../components';
import {showModal} from '../../../store/model/modelSlice';
import {useDispatch} from 'react-redux';

const SignUpScreen = ({navigation}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(signUpScreenInputSchema),
  });
  const dispatch = useDispatch();

  const [state, setState] = useState({
    description: '',
    isValidate: false,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [date, setDate] = useState({
    simple: '',
    formated: '',
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: any) => {
    const dt = new Date(date);
    const TimeSplit = dt.toISOString().split('T');
    const dateSplit = TimeSplit[0].split('-');
    let date_response = dateSplit[2] + '/' + dateSplit[1] + '/' + dateSplit[0];
    setDate(prevState => ({
      ...prevState,
      simple: date,
      formated: date_response,
    }));
    hideDatePicker();
  };

  const handleHideModal = () => {
    setState(prevState => ({
      ...prevState,
      isValidate: !prevState.isValidate,
    }));
  };

  const HandleSignUp = async (data: any) => {
    if (!date.formated) {
      setDisabled(false);
      return setState(prevState => ({
        ...prevState,
        isValidate: !prevState.isValidate,
        description: 'Date Of Birth is required.',
      }));
    }
    let dateToTimeStamp = new Date(date.simple).toISOString();

    data.DOB = dateToTimeStamp;
    data.role = 'Customer';
    console.log(data);
    try {
      setDisabled(true);
      const response = await apiResponseGenerator({
        method: 'post',
        url: 'api/register',
        body: data,
      });
      if (response) {
        if (!response.success) {
          dispatch(showModal({description: response.errors.email}));
          setDisabled(false);
        } else {
          navigation.navigate('SignInScreen');
        }
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
      setDisabled(false);
    }
  };

  return (
    <ScrollView>
      <ValidationModel
        isVisible={state.isValidate}
        modalImage={Images.WrongIcon}
        title={'Sorry'}
        description={state.description}
        onClose={handleHideModal}
        buttonText={'Ok'}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            mainHeaderText={'Sign up'}
            subHeaderText={'Enter your personal details to create your account'}
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
                label="First name"
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
                label="Last name"
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
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                keyboardType={'email-address'}
                label="Email"
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
                label="Phone number"
                keyboardType={'phone-pad'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.phone?.message}
              />
            )}
            name="phone"
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
                label="CNIC number"
                keyboardType={'phone-pad'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.cnic?.message}
              />
            )}
            name="cnic"
            defaultValue=""
          />
        </View>
        <View style={styles.input}>
          <Controller
            control={control}
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
          <TouchableOpacity onPress={showDatePicker}>
            <AnimatedInput
              label="Date Of Birth"
              editable={false}
              value={date?.formated}
            />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />

        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Password"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
                errorMsg={errors.password?.message}
              />
            )}
            name="password"
            defaultValue=""
          />
        </View>

        <View style={[styles.input]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Confirm Password"
                keyboardType={'default'}
                value={value}
                secureTextEntry={true}
                onChangeText={onChange}
                errorMsg={errors.confirm_password?.message}
              />
            )}
            name="confirm_password"
            defaultValue=""
          />
        </View>

        <TouchableOpacity style={styles.SignUpBtn}>
          <LargeButton
            disabled={disabled}
            onPress={handleSubmit(HandleSignUp)}
            text={'Sign Up'}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 20,
    width: '100%',
    height: 150,
  },
  input: {
    paddingHorizontal: 10,
    marginBottom: 8,
    width: '100%',
  },
  SignUpBtn: {
    width: '100%',
    marginVertical: 30,
    paddingHorizontal: 10,
  },
});
export default SignUpScreen;
