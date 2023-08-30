import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
import {
  AnimatedInput,
  DynamicStatusBar,
  ValidationModel,
} from '../../../components';
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
    console.log(data);
    // if (
    //   data.email === 'admin@cuttingedges.com' &&
    //   data.password == 'admin123'
    // ) {
    //   await AsyncStorage.setItem('authenticated', 'response.remember_token');
    //   dispatch(setAuthenticated(true));
    //   navigation.navigate('ApointmentScreen');
    // }
    try {
      setDisabled(true);
      const response = await apiResponseGenerator({
        method: 'post',
        url: 'api/login',
        body: data,
      });
      if (response) {
        await AsyncStorage.setItem('authenticated', response.token);
        await AsyncStorage.setItem('customer', response.data.id+"");
        dispatch(setAuthenticated(true));
        if (response.data.role === 'admin') {
          navigation.navigate('ApointmentScreen');
        } else {
          // sufiyankhanzada12541@gmail.com
          // 1123456789
          navigation.navigate('AllPackageScreen');
        }
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

      <View style={[styles.input, {marginTop: -20}]}>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  input: {
    marginBottom: 8,
    width: '100%',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  signInButton: {
    width: '100%',
    marginTop: 25,
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
