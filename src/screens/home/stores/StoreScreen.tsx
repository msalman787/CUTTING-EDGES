import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DynamicStatusBar, HeaderWithSearchInput, StoreCards} from '../../../components';
import {Colors, Images} from '../../../constants';
import { verticalScale} from '../../../utils/Dimentions';
const AllProducts = ({navigation}: any) => {
  const data = [
    {
      id: '1',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      phone: '+92 1234556005',
    },
    {
      id: '2',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      phone: '+92 1234556005',
    },
    {
      id: '3',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      phone: '+92 1234556005',
    },
    {
      id: '4',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      phone: '+92 1234556005',
    },
    {
      id: '5',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      phone: '+92 1234556005',
    },
    {
      id: '6',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      phone: '+92 1234556005',
    },
    {
      id: '7',
      image: Images.StoreImg,
      title: 'Smoke shop superstore ',
      description: '5701 w 29th ave, illinois, 60559',
      phone: '+92 1234556005',
    },
  ];
  const [searchText, setSearchText] = useState('');

  const handleToggleInput = () => {
    navigation.navigate('NearByStores');
  };

  const handleCloseInput = () => {
    navigation.goBack();
  };

  const handleSearchTextChange = (text: any) => {
    setSearchText(text);
  };

  const renderCardRow = ({item}: any) => (
    <StoreCards
      title={item.title}
      description={item.description}
      image={item.image}
      phone={item.phone}
    />
  );

  return (
    <View style={styles.container}>
      <DynamicStatusBar/>
      <View style={styles.header}>
        <HeaderWithSearchInput
          image={Images.StoreLocation}
          onIconPress={handleToggleInput}
          searchText={searchText}
          isInputVisible={true}
          showIcon={true}
          onSearchTextChange={handleSearchTextChange}
          title="Stores"
          onBackBtnPress={handleCloseInput}
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

export default AllProducts;
