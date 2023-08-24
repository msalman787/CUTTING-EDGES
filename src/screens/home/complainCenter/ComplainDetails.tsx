import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  HeaderWithSearchInput,
  DetailSlider,
  TextSeemore,
  LargeButton,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const ComplainDetails = ({navigation, route}: any) => {
  const {status} = route.params;
  const sliders_images = [
    require('../../../assets/images/productimage.jpg'),
    require('../../../assets/images/productimage.jpg'),
    require('../../../assets/images/productimage.jpg'),
  ];
  const handleCloseInput = () => {
    navigation.goBack();
  };

  let bgColor, textColor;

  switch (status) {
    case 'Approved':
      bgColor = 'rgba(227, 255, 233, 1)';
      textColor = 'rgba(41, 172, 68, 1)';
      break;
    case 'Rejected':
      bgColor = 'rgba(255, 226, 226, 1)';
      textColor = 'rgba(255, 65, 65, 1)';
      break;
    default:
      bgColor = 'rgba(255, 248, 214, 1)';
      textColor = 'rgba(233, 202, 40, 1)';
  }

  const descriptionText = `I am writing to express my deep disappointment and frustration with the NowPosh vaping device I recently purchased from your company. Upon closer inspection, it has become apparent that the device I received is a counterfeit or fake product.I believe it is essential to bring this matter to your attention and request immediate resolution. Several factors have led me to conclude that the NowPosh vaping device I received is indeed counterfeit. Firstly, the build quality of the product is subpar and noticeably different from the authentic NowPosh devices I have seen and used in the past.`;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="Complain Details"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <DetailSlider images={sliders_images} />
      <View style={styles.imageContainer}></View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={styles.titleContainer}>
          <View style={{width: '75%'}}>
            <Text style={styles.title}>Nowposh Fake Vaping Device</Text>
            <Text style={styles.subTitle}>16 May 2023</Text>
          </View>
          <View style={{marginTop: 5}}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: bgColor,
                },
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: textColor,
                  },
                ]}>
                {status}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingVertical: 10}}>
          <TextSeemore numberOfLines={15} description={descriptionText} />
        </View>
        {status === 'Approved' ? (
          <LargeButton
            onPress={() => {
              navigation.navigate('RadeemRewardScreen');
            }}
            text={'Radeem Reward'}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ComplainDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageContainer: {
    paddingHorizontal: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    flexWrap: 'wrap',
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 16,
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  subTitle: {
    color: Colors.LIGHT_GRAY,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
  flavorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flavor: {
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});
