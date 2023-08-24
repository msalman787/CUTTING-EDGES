import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Model} from '../../components';
import {Images} from '../../constants';

const AddToCardScreen = ({navigation}: any) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(true);

  const handleHideModal = () => {
    setConfirmationVisible(false);
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      setConfirmationVisible(true);
    }, []),
  );

  return (
    <Model
      isVisible={isConfirmationVisible}
      modalImage={Images.ComingSoon}
      title={''}
      description={
        "We're thrilled to announce that our upcoming app feature is coming soon!. Stay tuned for updates on this exciting new app feature!"
      }
      buttonText={'Close'}
      onClose={handleHideModal}
    />
  );
};

export default AddToCardScreen;
