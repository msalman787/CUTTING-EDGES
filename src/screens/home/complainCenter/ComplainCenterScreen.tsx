import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants';
import {ComplainCards, DynamicStatusBar, HeaderWithSearchInput} from '../../../components';
import {verticalScale} from '../../../utils/Dimentions';
import {FAB} from 'react-native-paper';

const ComplainCenterScreen = ({navigation}: any) => {
  const complain_data = [
    {
      id: 1,
      title: 'Nowposh Fake Vaping Device',
      date: '16 May 2023',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Nowposh Fake Vaping Device',
      date: '16 May 2023',
      status: 'Approved',
    },
    {
      id: 3,
      title: 'Nowposh Fake Vaping Device',
      date: '16 May 2023',
      status: 'Rejected',
    },
    {
      id: 4,
      title: 'Nowposh Fake Vaping Device',
      date: '16 May 2023',
      status: 'Pending',
    },
    {
      id: 5,
      title: 'Nowposh Fake Vaping Device',
      date: '16 May 2023',
      status: 'Approved',
    },
    {
      id: 6,
      title: 'Nowposh Fake Vaping Device',
      date: '16 May 2023',
      status: 'Pending',
    },
    {
      id: 7,
      title: 'Nowposh Fake Vaping Device',
      date: '16 May 2023',
      status: 'Rejected',
    },
  ];

  const handleCloseInput = () => {
    navigation.goBack();
  };

  const goToDetailScreen = (value:any) => {
    navigation.navigate("ComplainDetailScreen", { status: value }); 
  };

  const handlePress = () => {
    navigation.navigate("NewComplainScreen");
  };

  const renderCardRow = ({item}: any) => (
    <ComplainCards onPress={goToDetailScreen} title={item.title} status={item.status} date={item.date} />
  );
  return (
    <View style={styles.container}>
      <DynamicStatusBar/>
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="My Complains"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <View style={styles.cardsContainer}>
        <FlatList
          data={complain_data}
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

export default ComplainCenterScreen;

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
