import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants';
import {
  AppointmentCards,
  DynamicStatusBar,
  HeaderWithSearchInput,
} from '../../../components';
import {verticalScale} from '../../../utils/Dimentions';
import {FAB} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthenticated } from '../../../store/auth/authSlice';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const ApointmentScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const appointment_data = [
    {
      id: 1,
      title: "Gentleman's Grooming Deluxe",
      date: '16 May 2023',
    },
    {
      id: 2,
      title: "Suave Swagger Package",
      date: '16 May 2023',
    },
    {
      id: 3,
      title: "Gentleman's Grooming Deluxe",
      date: '16 May 2023',
      status: 'Rejected',
    },
    {
      id: 4,
      title: "Suave Swagger Package",
      date: '16 May 2023',
    },
    {
      id: 5,
      title: "Gentleman's Grooming Deluxe",
      date: '16 May 2023',
    },
    {
      id: 6,
      title: "Suave Swagger Package",
      date: '16 May 2023',
    },
    {
      id: 7,
      title: "Gentleman's Grooming Deluxe",
      date: '16 May 2023',
      status: 'Rejected',
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
  };;



  const handlePress = () => {
    navigation.navigate('NewPackageScreen');
  };

  const handleAccept = () => {
    console.log("handle accept")
  };
  const handleReject = () => {
    console.log("handle reject")
  };

  const renderCardRow = ({item}: any) => (
    <AppointmentCards
      onAccept={handleAccept}
      onReject={handleReject}
      title={item.title}
      status={item.status}
      date={item.date}
    />
  );
  return (
    <View style={styles.container}>
      <DynamicStatusBar />
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="APPOINTMENTS"
          showIcon={true}
          image={"log-out"}
          onIconPress={handleLogout}
          titleStyle={-55}
        />
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={appointment_data}
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
    </View>
  );
};

export default ApointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardsContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
    paddingBottom: 100,
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
