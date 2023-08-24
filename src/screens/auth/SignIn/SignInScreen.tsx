import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import InputField from '../../../components/Input/Input';
import LargeButton from '../../../components/Buttons/Button';
import {Fonts, Colors} from '../../../constants';
import Header from '../../../components/Header/Header';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {signInScreenInputSchema} from '../../../validations/SignIn';
import Images from '../../../constants/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setAuthenticated} from '../../../store/auth/authSlice';
import {DynamicStatusBar, ValidationModel} from '../../../components';
import apiResponseGenerator from '../../../service/apiGenerator';
import {showModal} from '../../../store/model/modelSlice';

const SignInScreen = ({navigation}: any) => {
  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: '',
    buttonText: 'Ok',
    isValidate: false,
  });
  const emailRef = useRef(null);
  const passwordRef: any = useRef(null);

  const handleEmailNext = () => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  };
  const [disabled, setDisabled] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(signInScreenInputSchema),
  });

  const dispatch = useDispatch();

  const goToSignUpScreen = () => {
    navigation.navigate('SignUpScreen');
  };

  const HandleSignIn = async (data: any) => {
    try {
      setDisabled(true);
      const response = await apiResponseGenerator({
        method: 'post',
        url: '/api/auth/login',
        body: data,
      });
      if (response) {
        await AsyncStorage.setItem('authenticated', response.remember_token);
        dispatch(setAuthenticated(true));
        navigation.navigate('BottomTabNavigation');
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
      setDisabled(false);
    }
  };

  const handleHideModal = () => {
    setState(prevState => ({
      ...prevState,
      isValidate: !prevState.isValidate,
    }));
  };

  return (
    <View style={styles.container}>
      <ValidationModel
        isVisible={state.isValidate}
        modalImage={state.image}
        title={state.title}
        bgColor={state.bgColor}
        description={state.description}
        onClose={handleHideModal}
        buttonText={state.buttonText}
      />
      <DynamicStatusBar />
      <Header
        mainHeaderText={'Welcome'}
        subHeaderText={'Sign in to continue'}
      />
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
          <InputField
            ref={emailRef}
            returnKeyType={'next'}
            icon={Images.Message}
            keyboardType="email-address"
            placeholder="Email"
            secureTextEntry={false}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            onSubmitEditing={handleEmailNext}
            errorMsg={errors.email?.message && errors.email?.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 8,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputField
            ref={passwordRef}
            returnKeyType={'done'}
            placeholder="Password"
            icon={Images.Lock}
            secureTextEntry={true}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            errorMsg={errors.password?.message && errors.password?.message}
          />
        )}
        name="password"
      />

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton}>
        <LargeButton
          disabled={disabled}
          onPress={handleSubmit(HandleSignIn)}
          text={'Sign In'}
        />
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={goToSignUpScreen}>
          <Text style={styles.footerSignUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  signInButton: {
    width: '100%',
  },
  footerTextContainer: {
    flexDirection: 'row',
    marginTop: 60,
  },
  footerText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  footerSignUpText: {
    marginLeft: 3,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default SignInScreen;
