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
  PackageCards,
} from '../../../components';
import {Colors, Images} from '../../../constants';
import {verticalScale} from '../../../utils/Dimentions';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated } from '../../../store/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const AllPackages = ({navigation}: any) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  console.log({isAuthenticated});
  console.log({isConfirmationVisible});
  const data = [
    {
      id: '1',
      image: Images.New_Look1,
      title: "Gentleman's Grooming Deluxe",
      description: 'Ultimate grooming with tailored haircut, beard styling, hot towel treatment, and scalp massage for a refreshed, refined look.',
      price: 300,
    },
    {
      id: '2',
      image: Images.New_Look2,
      title: "Suave Swagger Package",
      description: 'Elevate your charm with a sleek haircut, suave beard shaping, eyebrow grooming, and a cooling mint facial mask. Step out exuding irresistible charisma and confidence.',
      price: 300,
    },
    {
      id: '3',
      image: Images.New_Look1,
      title: "Gentleman's Grooming Deluxe",
      description: 'Ultimate grooming with tailored haircut, beard styling, hot towel treatment, and scalp massage for a refreshed, refined look.',
      price: 300,
    },
    {
      id: '4',
      image: Images.New_Look2,
      title: "Suave Swagger Package",
      description: 'Elevate your charm with a sleek haircut, suave beard shaping, eyebrow grooming, and a cooling mint facial mask. Step out exuding irresistible charisma and confidence.',
      price: 300,
    },
    {
      id: '5',
      image: Images.New_Look1,
      title: "Gentleman's Grooming Deluxe",
      description: 'Ultimate grooming with tailored haircut, beard styling, hot towel treatment, and scalp massage for a refreshed, refined look.',
      price: 300,
    },
    {
      id: '6',
      image: Images.New_Look2,
      title: "Suave Swagger Package",
      description: 'Elevate your charm with a sleek haircut, suave beard shaping, eyebrow grooming, and a cooling mint facial mask. Step out exuding irresistible charisma and confidence.',
      price: 300,
    },
    {
      id: '7',
      image: Images.New_Look1,
      title: "Gentleman's Grooming Deluxe",
      description: 'Ultimate grooming with tailored haircut, beard styling, hot towel treatment, and scalp massage for a refreshed, refined look.',
      price: 300,
    },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authenticated');
    dispatch(setAuthenticated(false));
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'SignInScreen'}],
    });
    navigation.dispatch(resetAction);
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
    <PackageCards
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
            "Discover personalized experiences and exclusive benefits, sign up today to join our community! 🌟📲"
          }
          buttonText={'Create'}
          onClose={handleHideModal}
          onPageRedirect={handleCreateAccount}
        />
      )}
      <View style={styles.header}>
        <HeaderWithSearchInput
          onIconPress={handleLogout}
          showIcon={isAuthenticated}
          image={'log-out'}
          title="PACKAGES"
          titleStyle={isAuthenticated ? -55  :-35}
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
