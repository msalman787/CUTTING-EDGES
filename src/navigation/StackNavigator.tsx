import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigation from './BottomTabNavigation';
import {
  AllPackages,
  AllProducts,
  ApointmentScreen,
  ComplainCenterScreen,
  ComplainDetails,
  LicenseIdScreen,
  NearByStores,
  NewAppointment,
  NewComplain,
  NewPackage,
  PrivacyAndPolicyScreen,
  ProductDetails,
  RadeemReward,
  SignInScreen,
  SignUpScreen,
  SpinAndWin,
  SplashScreen,
  StoreScreen,
  TermAndConditionScreen,
  VerifyProduct,
  WinRewards,
} from '../screens';
import {setAuthenticated} from '../store/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticated = await AsyncStorage.getItem('authenticated');  
        if (authenticated) {
          dispatch(setAuthenticated(true));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    checkAuthentication();
  }, [dispatch]);

  return (
    <Stack.Navigator>
      {/* {initialLaunch ? (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      ) : null} */}
      {/* 
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      /> 
      */}
      <Stack.Screen
        name="AllPackageScreen"
        component={AllPackages}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ApointmentScreen"
        component={ApointmentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewAppointmentScreen"
        component={NewAppointment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewPackageScreen"
        component={NewPackage}
        options={{headerShown: false}}
      />
      {!isAuthenticated && (
        <>
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{headerShown: false}}
          />
        </>
      )}
      {/* <Stack.Screen
        name="AllStores"
        component={StoreScreen}
        options={{headerShown: false}}
      /> 
      <Stack.Screen
        name="NearByStores"
        component={NearByStores}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="ComplainCenterScreen"
        component={ComplainCenterScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="NewComplainScreen"
        component={NewComplain}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ComplainDetailScreen"
        component={ComplainDetails}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="RadeemRewardScreen"
        component={RadeemReward}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="VerifyProductScreen"
        component={VerifyProduct}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="WinRewardScreen"
        component={WinRewards}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SpinAndWinScreen"
        component={SpinAndWin}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
