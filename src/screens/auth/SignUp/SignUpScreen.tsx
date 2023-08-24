import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from '../../../components/Header/Header';
import DropDown from '../../../components/Dropdown/Dropdown';
import {Colors, Fonts, Images} from '../../../constants';
import AnimatedInput from '../../../components/Input/AnimatedInput';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {signUpScreenInputSchema} from '../../../validations/Signup';
import LargeButton from '../../../components/Buttons/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {Checkbox, TextInput} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PhoneInput from 'react-native-phone-number-input';
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

  const [UserType, setUserType] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState({
    description: '',
    isValidate: false,
  });
  const [checked, setChecked] = React.useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
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

  const refs: any = {
    registrationNo: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const handleNext = (currentRef: any) => {
    const refKeys: any = Object.keys(refs);
    const currentIndex = refKeys.findIndex(
      (key: any) => refs[key].current === currentRef,
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < refKeys.length && refs[refKeys[nextIndex]].current) {
      refs[refKeys[nextIndex]].current.focus();
    }
  };

  const signUpList = [
    {
      label: 'Customer',
      value: 'customer',
    },
    {
      label: 'Retailer',
      value: 'retailer',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];

  const handleUserTypeChange = (selectedUserType: any) => {
    setUserType(selectedUserType);
    setShowDropDown(false);
  };

  const goToTermAndConditionsScreen = () => {
    navigation.navigate('TermAndConditionScreen');
  };

  const goToPrivacyAndPolicyScreen = () => {
    navigation.navigate('PrivacyAndPolicyScreen');
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

    data.dateOfBirth = dateToTimeStamp;
    data.phoneNo = phone;
    data.role_id = 2;
    try {
      setDisabled(true);
      delete data.Confirm_Password;
      const response = await apiResponseGenerator({
        method: 'post',
        url: '/api/auth/signup',
        body: data,
      });
      if (response) {
        navigation.navigate('SignInScreen');
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
            visible={showDropDown}
            mainHeaderText={'Sign up'}
            subHeaderText={'Enter your personal details to create your account'}
          />
        </View>

        <View style={styles.dropdownContainer}>
          <DropDown
            label={'Signup As'}
            itemList={signUpList}
            value={UserType}
            setValue={setUserType}
            handleChange={handleUserTypeChange}
            showDropDown={showDropDown}
            setShowDropDown={setShowDropDown}
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
                label="Registration No"
                returnKeyType={'next'}
                ref={refs.registrationNo}
                onSubmitEditing={() => handleNext(refs.registrationNo.current)}
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.registrationNumber?.message}
              />
            )}
            name="registrationNumber"
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
                ref={refs.firstName}
                returnKeyType={'next'}
                onSubmitEditing={() => handleNext(refs.firstName.current)}
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
                ref={refs.lastName}
                onSubmitEditing={() => handleNext(refs.lastName.current)}
                label="Last Name"
                returnKeyType={'next'}
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
                label="Email address"
                ref={refs.email}
                returnKeyType={'next'}
                onSubmitEditing={() => handleNext(refs.email.current)}
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
          <View
            style={{
              borderColor: Colors.INPUT_BORDER,
              borderWidth: 1,
              marginTop: 20,
              borderRadius: 5,
            }}>
            <PhoneInput
              defaultCode="US"
              textInputStyle={styles.textContainer}
              containerStyle={styles.flagContainer}
              codeTextStyle={styles.codeContainer}
              onChangeFormattedText={text => setPhone(text)}
            />
          </View>
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
                ref={refs.password}
                returnKeyType={'next'}
                onSubmitEditing={() => handleNext(refs.password.current)}
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
                ref={refs.confirmPassword}
                onSubmitEditing={() => handleNext(refs.confirmPassword.current)}
                returnKeyType={'done'}
                label="Confirm Password"
                keyboardType={'default'}
                value={value}
                secureTextEntry={true}
                onChangeText={onChange}
                errorMsg={errors.Confirm_Password?.message}
              />
            )}
            name="Confirm_Password"
            defaultValue=""
          />
        </View>

        <View style={styles.footerTextContainer}>
          <View style={{marginLeft:-20}}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={Colors.DEFAULT_BLACK}
            />
          </View>
          <View style={styles.inlineContainer}>
            <Text style={styles.footerText}>I agree to the Now posh</Text>
            <TouchableOpacity onPress={goToTermAndConditionsScreen}>
              <Text style={styles.boldTouchableText}>
                {' '}
                Terms and Conditions
              </Text>
            </TouchableOpacity>
            <Text style={styles.footerText}> and </Text>
            <TouchableOpacity onPress={goToPrivacyAndPolicyScreen}>
              <Text style={styles.boldTouchableText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.SignUpBtn}>
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
  dropdownContainer: {
    width: '100%',
    paddingHorizontal: 10,
    fontFamily: Fonts.POPPINS_REGULAR,
    height: 40,
    backgroundColor: Colors.DEFAULT_WHITE,
    zIndex: 999,
    marginBottom: 20,
  },
  SignUpBtn: {
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  footerTextContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginHorizontal:10,
    marginTop: 25,
  },
  footerText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  boldTouchableText: {
    marginTop: -5,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontWeight: 'bold',
  },
  // Country picker
  textContainer: {
    height: 45,
    marginTop: 9,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  flagContainer: {
    borderRadius: 5,
    width: '98%',
    height: 50,
  },
  codeContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});
export default SignUpScreen;
