import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header/Header';
import {Colors} from '../../../constants';

const TermAndConditionScreen = ({navigation}:any) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header
          mainHeaderText={'Terms & Conditions'}
          subHeaderText={
            'The NowPosh Vaping Device Selling App ("App") enables Users to browse, purchase, and review vaping devices and related products. By accessing or using the App, Users agree to abide by these Terms. The App provides information about vaping devices, including descriptions, images, and pricing, with the Company aiming to provide accurate and up-to-date information. Users may place orders for products through the App, subject to age verification and providing accurate information. The Company will make reasonable efforts to ensure timely delivery of purchased products, while returns and refunds may be eligible under the Company s Return and Refund Policy. The Apps content including text images, logos, and trademarks, are protected by intellectual property laws. The Company s collection and use of User information are governed by its Privacy Policy.The NowPosh Vaping Device Selling App ("App") enables Users to browse, purchase, and review vaping devices and related products. By accessing or using the App, Users agree to abide by these Terms'
          }
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default TermAndConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
});
