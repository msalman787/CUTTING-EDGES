import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from './constants';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const App = () => {
  const isLoading = useSelector((state: any) => state.apiloader.isLoading);
  return (
    <NavigationContainer>
      <StackNavigator />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.DEFAULT_BLACK} />
        </View>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.DEFAULT_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
