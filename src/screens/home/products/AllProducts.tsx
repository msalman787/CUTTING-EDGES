import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  DynamicStatusBar,
  HeaderWithSearchInput,
  ProductCard,
} from '../../../components';
import {Colors, Images} from '../../../constants';
import {horizontalScale, verticalScale} from '../../../utils/Dimentions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {showModal} from '../../../store/model/modelSlice';
import apiResponseGenerator from '../../../service/apiGenerator';
import {ActivityIndicator} from 'react-native-paper';
import {
  finishLoading,
  startLoading,
} from '../../../store/apiLoader/apiLoaderSlice';

const AllProducts = ({navigation}: any) => {
  const [products, setProducts] = useState([]);
  const [isInputVisible, setInputVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

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
        url: '/api/products/getAll',
      });
      if (response) {
        setProducts(response);
        return dispatch(finishLoading());
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };

  const handleToggleInput = () => {
    if (isInputVisible) {
      setInputVisible(!isInputVisible);
    } else {
      setInputVisible(!isInputVisible);
    }
  };

  const handleCloseInput = () => {
    navigation.goBack();
  };

  const handleSearchTextChange = (text: any) => {
    setSearchText(text);
  };

  const filteredData = products.filter((item: any) =>
    item?.productName?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderCardRow = ({item}: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetails', {item});
      }}
      style={styles.cardRow}>
      <ProductCard
        image={Images.ProductCard}
        title={item.productName}
        rate={`$${item.flavours.length > 0 ? item.flavours[0]?.price : "99.99"}`}
        // old_rate={'$199.99'}
        flavors={`${item.flavours.length} Flavours`}
        bgColor={
          item.id % 2 === 0
            ? 'rgba(243, 217, 232, 1)'
            : 'rgba(186, 199, 238, 1)'
        }
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <DynamicStatusBar />
      <View style={styles.header}>
        <HeaderWithSearchInput
          image={Images.Search}
          onIconPress={handleToggleInput}
          searchText={searchText}
          isInputVisible={isInputVisible}
          onSearchTextChange={handleSearchTextChange}
          title="All Products"
          showIcon={true}
          onBackBtnPress={handleCloseInput}
        />
      </View>
      <View style={styles.cardsContainer}>
        {filteredData.length === 0 ? (
          <Text>Sorry, product not found.</Text>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderCardRow}
            keyExtractor={(item: any) => item.id}
            numColumns={2}
          />
        )}
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
    flex: 1,
    paddingVertical: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: verticalScale(13),
    paddingHorizontal: horizontalScale(2),
  },
});

export default AllProducts;
