import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AllPackages,
  ApointmentScreen,
  NewAppointment,
  NewPackage,
  SignInScreen,
  SignUpScreen,
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
    
    </Stack.Navigator>
  );
};

export default StackNavigator;
