import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {hideModal, showModal} from './store/model/modelSlice';
import {ValidationModel} from './components';
import {Colors, Images} from './constants';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const modelState = useSelector((state: any) => state.model);
  const isLoading = useSelector((state: any) => state.apiloader.isLoading);

  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      if (!state.isConnected) {
        dispatch(showModal({description: 'No Internet connection available'}));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log({isLoading});
  return (
    <NavigationContainer>
      <StackNavigator />
      {modelState.isValidate && (
        <ValidationModel
          isVisible={modelState.isValidate}
          modalImage={Images.WrongIcon}
          title={'Sorry'}
          description={modelState.description}
          onClose={handleHideModal}
          buttonText={'Ok'}
        />
      )}
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
