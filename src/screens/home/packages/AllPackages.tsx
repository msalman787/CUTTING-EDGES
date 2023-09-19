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
import {ActivityIndicator, Searchbar} from 'react-native-paper';

const AllPackages = ({navigation, route}: any) => {
  const data:any = route.params;

  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const isLoading = useSelector((state: any) => state.apiloader.isLoading);
  const [packages, setPackages] = useState([]);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  useEffect(() => {
    getAllProducts(data.name);
    return () => {
      dispatch(finishLoading());
    };
  }, []);

  const getAllProducts = async (name:any) => {
    try {
      dispatch(startLoading());
      const response = await apiResponseGenerator({
        url: `api/singlepacktype/${name}`,
      });
      if (response) {
        setPackages(response.Pricing);
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

  const handleNavigation = (package_id: string, admin_id: string) => {
    setConfirmationVisible(true);
    if (isAuthenticated) {
      navigation.navigate('NewAppointmentScreen', {package_id, admin_id});
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
      id={item.id}
      title={item.Plan_title}
      admin_id={item.admin_id}
      description={item.Plan_description}
      google_map_link={item.google_map_link}
      image={item.id % 2 === 0 ? Images.New_Look1 : Images.New_Look2}
      price={item.Plan_price}
      location={item.location || ''}
      onPress={handleNavigation}
    />
  );
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
  };
  const filteredData = packages?.filter((item: any) => {
    const google_map_link = item?.google_map_link || '';
    return google_map_link.toLowerCase().includes(searchQuery.toLowerCase());
  });
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
          titleStyle={!isAuthenticated ? 50 : 0}
          image={'log-out'}
          title="PACKAGES"
        />
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.DEFAULT_BLACK} />
        </View>
      ) : (
        <View style={styles.cardsContainer}>
          <Searchbar
            placeholder="Search map location..."
            cursorColor={Colors.DEFAULT_BLACK}
            selectionColor={Colors.LIGHT_GRAY}
            style={{
              borderRadius: 10,
              marginHorizontal: 10,
              marginVertical: 10,
              backgroundColor: Colors.DEFAULT_WHITE,
            }}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <FlatList
            data={filteredData}
            renderItem={renderCardRow}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      )}
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
    paddingBottom: 150,
  },
});

export default AllPackages;
