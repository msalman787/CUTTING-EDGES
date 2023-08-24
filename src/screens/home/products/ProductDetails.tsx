import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  HeaderWithSearchInput,
  DetailSlider,
  TextSeemore,
} from '../../../components';
import {Colors, Fonts, Images} from '../../../constants';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import apiResponseGenerator from '../../../service/apiGenerator';
import { showModal } from '../../../store/model/modelSlice';
import { useDispatch } from 'react-redux';
import { finishLoading, startLoading } from '../../../store/apiLoader/apiLoaderSlice';

const ProductDetails = ({navigation, route}: any) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const [productDetails, setProductDetails]:any = useState(null)
  
  const sliders_images = [
    require('../../../assets/images/productimage.jpg'),
    require('../../../assets/images/productimage.jpg'),
    require('../../../assets/images/productimage.jpg'),
  ];

  useEffect(() => {
    getProductDetailById(item?.id);
    return () => {
      dispatch(finishLoading());
    };
  }, []);

  const getProductDetailById = async (id:number) => {
    try {
      dispatch(startLoading())
      const response = await apiResponseGenerator({
        url: `/api/products/getDetails/${id}`,
      });
      if (response) {
        setProductDetails(response)
        dispatch(finishLoading())
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };

  const handleCloseInput = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderWithSearchInput
          title="Products Details"
          onBackBtnPress={handleCloseInput}
          titleStyle={30}
        />
      </View>
      <DetailSlider images={sliders_images} />
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.image}>
          <Images.Heart />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'column', padding: 10}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{productDetails?.productName}</Text>
          <Text style={styles.title}>${productDetails?.flavours[0]?.price}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>{productDetails?.flavours.length} Flavours</Text>
          {/* <Text
            style={[
              styles.subTitle,
              {
                color: 'red',
                textDecorationLine: 'line-through',
                fontWeight: 'bold',
              },
            ]}>
            $1299.99
          </Text> */}
        </View>
        <View style={{paddingVertical: 10}}>
          <TextSeemore
            description={item && item?.productDescription}
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text style={styles.title}>Flavors</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {productDetails?.flavours.map((item:any, i:number) => (
              <Text key={i} style={styles.flavorText}>
                {item?.productFlavour?.flavourName}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  image: {
    borderRadius: 50,
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 10,
    marginTop: -25,
    elevation: 15,
    shadowOpacity: 0.1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: 18,
  },
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  subTitle: {
    color: Colors.LIGHT_GRAY,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
  flavorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flavor: {
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  flavorText: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 12,
    fontFamily: Fonts.POPPINS_REGULAR,
    borderColor: 'rgba(192, 200, 199, 1)',
    borderWidth: 1,
    borderRadius: 10,
  },
});
