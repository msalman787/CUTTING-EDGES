import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import {Colors} from './constants';
import {StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;

