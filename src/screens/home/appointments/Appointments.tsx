import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constants';
import {
  AppointmentCards,
  DynamicStatusBar,
  HeaderWithSearchInput,
} from '../../../components';
import {verticalScale} from '../../../utils/Dimentions';
import {ActivityIndicator, FAB} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthenticated} from '../../../store/auth/authSlice';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import apiResponseGenerator from '../../../service/apiGenerator';
import {
  finishLoading,
  startLoading,
} from '../../../store/apiLoader/apiLoaderSlice';
import {showModal} from '../../../store/model/modelSlice';

const ApointmentScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.apiloader.isLoading);

  const [appointment, setAppointment] = useState([]);

  const getAdminId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('customer');
      if (jsonValue) {
        getAllAppointments(jsonValue);
        return jsonValue;
      }
      return null;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };
  useEffect(() => {
    getAdminId();
    return () => {
      dispatch(finishLoading());
    };
  }, []);

  const getAllAppointments = async (id: string) => {
    try {
      dispatch(startLoading());
      const response = await apiResponseGenerator({
        url: `api/allappointments/${id}`,
      });
      if (response) {
        setAppointment(response.data);
        return dispatch(finishLoading());
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authenticated');
    dispatch(setAuthenticated(false));
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'SignInScreen'}],
    });
    navigation.dispatch(resetAction);
  };

  const handlePress = () => {
    navigation.navigate('NewPackageScreen');
  };

  const handleAccept = async (id: number) => {
    try {
      dispatch(startLoading());
      const response = await apiResponseGenerator({
        url: `api/accept_appointments/${id}`,
      });
      if (response) {
        getAdminId();
        return;
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };

  const handleReject = async (id: number) => {
    try {
      dispatch(startLoading());
      const response = await apiResponseGenerator({
        url: `api/accept_appointments/${id}`,
      });
      if (response) {
        getAdminId();
        return;
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };

  const renderCardRow = ({item}: any) => (
    <AppointmentCards
      onAccept={handleAccept}
      onReject={handleReject}
      id={item?.id}
      title={item?.packages?.Plan_title}
      phone={item?.mobile_number}
      date={item?.appointment_date_time}
      type={item?.packages?.type}
      customer_name={`${item?.first_name} ${item?.last_name}`}
    />
  );
  return (
    <View style={styles.container}>
      <DynamicStatusBar />
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="APPOINTMENTS"
          showIcon={true}
          image={'log-out'}
          onIconPress={handleLogout}
        />
      </View>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.DEFAULT_BLACK} />
        </View>
      ) : (
        <>
          <View style={styles.cardsContainer}>
            <FlatList
              data={appointment}
              renderItem={renderCardRow}
              keyExtractor={(item: any) => item.id}
            />
          </View>
          <FAB
            icon="plus"
            mode="elevated"
            animated={true}
            color="white"
            style={styles.fab}
            onPress={handlePress}
          />
        </>
      )}
    </View>
  );
};

export default ApointmentScreen;

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
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 70,
    color: Colors.DEFAULT_WHITE,
    backgroundColor: Colors.DEFAULT_BLACK,
  },
});
