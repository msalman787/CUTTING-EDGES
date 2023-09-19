import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationModel } from './components';
import { Images } from './constants';
import { hideModal } from './store/model/modelSlice';

const App = () => {
  const modelState = useSelector((state: any) => state.model);
  const dispatch = useDispatch();

  const handleHideModal = () => {
    dispatch(hideModal());
  };
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
    </NavigationContainer>
  );
};

export default App;

