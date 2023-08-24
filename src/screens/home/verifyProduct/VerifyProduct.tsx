import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  AnimatedInput,
  DynamicStatusBar,
  HeaderWithSearchInput,
  LargeButton,
  ValidationModel,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ScrollView} from 'react-native-gesture-handler';
import {VerifyProductScreenInputSchema} from '../../../validations/VerifyProduct';

const VerifyProduct = ({navigation}: any) => {
  const [state, setState] = useState({
    title: 'Sorry!',
    bgColor: '',
    image: Images.WrongIcon,
    description: 'You can only added up to 3 images.',
    buttonText: 'Ok',
    isValidate: false,
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(VerifyProductScreenInputSchema),
  });

  const handleCloseInput = () => {
    navigation.goBack();
  };

  const handleHideModal = () => {
    setState(prevState => ({
      ...prevState,
      isValidate: !prevState.isValidate,
    }));
  };

  const HandleVerifyProduct = async (data: any) => {
    setState(prevState => ({
      ...prevState,
      title: 'Success',
      image: Images.SucessIcon,
      description: 'This Device is original.',
      bgColor: 'rgba(41, 172, 68, 1)',
      isValidate: true,
    }));
    console.log(data);
  };

  return (
    <ScrollView style={styles.container}>
      <DynamicStatusBar />

      <ValidationModel
        isVisible={state.isValidate}
        modalImage={state.image}
        title={state.title}
        bgColor={state.bgColor}
        description={state.description}
        onClose={handleHideModal}
        buttonText={state.buttonText}
        onPageRedirect={handleHideModal}
      />

      <View style={styles.header}>
        <HeaderWithSearchInput
          title="Verify Product"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <View style={styles.subContainer}>
        <View>
          <Text
            style={{
              flexWrap: 'wrap',
              fontFamily: Fonts.POPPINS_REGULAR,
              color:Colors.DEFAULT_BLACK,
              fontSize: 16,
            }}>
            Please enter your 8 digit security code
          </Text>
        </View>
        <View style={{alignItems: 'center',marginVertical:10}}>
          <Image
            source={require('../../../assets/images/strachCard.jpg')}
            style={styles.image}
          />
        </View>

        <View style={styles.input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AnimatedInput
                label="Verify Code"
                keyboardType={'default'}
                value={value}
                onChangeText={onChange}
                errorMsg={errors.VerifyCode?.message}
              />
            )}
            name="VerifyCode"
            defaultValue=""
          />
        </View>

        <View style={{marginVertical: 30}}>
          <LargeButton
            onPress={handleSubmit(HandleVerifyProduct)}
            text={'Verify'}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default VerifyProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  subContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
  },
  input: {
    marginBottom: 5,
    width: '100%',
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'cover',
  },
});
