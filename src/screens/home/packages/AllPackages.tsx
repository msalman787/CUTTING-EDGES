import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DynamicStatusBar,
  HeaderWithSearchInput,
  Model,
  StoreCards,
} from '../../../components';
import {Colors, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
import { useSelector } from 'react-redux';

const AllPackages = ({navigation}: any) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  console.log({isAuthenticated});
  console.log({isConfirmationVisible});
  const data = [
    {
      id: '1',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      price: 300,
    },
    {
      id: '2',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      price: 300,
    },
    {
      id: '3',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      price: 300,
    },
    {
      id: '4',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      price: 300,
    },
    {
      id: '5',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      price: 300,
    },
    {
      id: '6',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      price: 300,
    },
    {
      id: '7',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      price: 300,
    },
  ];

  const handleToggleInput = () => {
    navigation.navigate('NearByStores');
  };

  const goToSignUpScreen = () => {
    navigation.navigate('NewAppointmentScreen');
  };

  const handleNavigation = () => {
    setConfirmationVisible(true);
    if (isAuthenticated) {
      navigation.navigate('NewAppointmentScreen');
    }
  };
  const handleCreateAccount = async () => {
    setConfirmationVisible(false);
    await navigation.navigate('SignInScreen');
  };

  const handleHideModal = () => {
    setConfirmationVisible(false);
  };

  const renderCardRow = ({item}: any) => (
    <StoreCards
      title={item.title}
      description={item.description}
      image={item.image}
      price={item.price}
      onPress={handleNavigation}
    />
  );

  return (
    <View style={styles.container}>
      <DynamicStatusBar />
      {!isAuthenticated && isConfirmationVisible && (
        <Model
          isVisible={isConfirmationVisible}
          modalImage={Images.CreateAmount}
          title={'Create an Account'}
          description={
            "with us and you'll be able to book appointments."
          }
          buttonText={'Create'}
          onClose={handleHideModal}
          onPageRedirect={handleCreateAccount}
        />
      )}
      <View style={styles.header}>
        <HeaderWithSearchInput
          onIconPress={handleToggleInput}
          showIcon={true}
          image={'log-out'}
          title="PACKAGES"
          titleStyle={-55}
        />
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={data}
          renderItem={renderCardRow}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  cardsContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
    paddingBottom: 100,
  },
});

export default AllPackages;
