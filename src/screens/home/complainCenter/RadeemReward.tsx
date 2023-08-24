import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CongratulationScreen, } from '../../../components';

const RadeemReward = ({navigation, route}: any) => {
  const item = route?.params;
  const handleGoback = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1}}>
      <CongratulationScreen
        headerTitle={'Redeem Reward'}
        handleGoback={handleGoback}
        description={
          item?.data
            ? item.data?.description
            : 'Your complain has been approved please get a replacement from the retailer by showing this Qr code.'
        }
        qrcodeValue={item?.data ? item.data?.qrcodeValue : 'https://nowposh.com/'}
      />
    </View>
  );
};

export default RadeemReward;
