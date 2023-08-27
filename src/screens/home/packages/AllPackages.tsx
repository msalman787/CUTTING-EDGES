import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {setAuthenticated} from '../../../store/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {
  finishLoading,
  startLoading,
} from '../../../store/apiLoader/apiLoaderSlice';
import apiResponseGenerator from '../../../service/apiGenerator';
import {showModal} from '../../../store/model/modelSlice';

const AllPackages = ({navigation}: any) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [packages, setPackages] = useState([]);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );

  useEffect(() => {
    getAllProducts();
    return () => {
      dispatch(finishLoading());
    };
  }, []);

  const getAllProducts = async () => {
    try {
      dispatch(startLoading());
      const response = await apiResponseGenerator({
        url: 'api/allpricing',
      });
      if (response) {
        setPackages(response.data);
        return dispatch(finishLoading());
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };
  console.log({isAuthenticated});
  console.log({isConfirmationVisible});

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
      title={item.Plan_title}
      description={item.Plan_description}
      image={item.id % 2 === 0 ? Images.New_Look1 : Images.New_Look2 }
      price={item.Plan_price}
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
            'Discover personalized experiences and exclusive benefits, sign up today to join our community! 🌟📲'
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
          titleStyle={isAuthenticated ? -55 : -35}
        />
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={packages}
          renderItem={renderCardRow}
          keyExtractor={(item: any) => item.id}
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
