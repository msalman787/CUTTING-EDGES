import {View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setAuthenticated} from '../../store/auth/authSlice';
import { CommonActions } from '@react-navigation/native';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authenticated');
    dispatch(setAuthenticated(false));
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'SignInScreen'}],
    });
    navigation.dispatch(resetAction);
  };

  return (
    <View>
      <Button children="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
