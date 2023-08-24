import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors, Fonts, Images} from '../../constants';
import {Searchbar} from 'react-native-paper';
import {verticalScale} from '../../utils/Dimentions';
import {Banners, DynamicStatusBar, Model, ProductCard} from '../../components';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({navigation}: any) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  console.log({isAuthenticated});
  console.log({isConfirmationVisible});

  const data = [
    {
      id: '1',
      image: Images.ProductCard,
      title: 'Posh Plus 1500',
      flavors: '20 Flavours',
      rate: '$999.99',
      old_rate: '$1299.99',
      bgColor: 'rgba(186, 199, 238, 1)',
    },
    {
      id: '2',
      image: Images.ProductCard,
      title: 'Posh Plus 2500',
      flavors: '10 Flavours',
      rate: '$99.99',
      old_rate: '$199.99',
      bgColor: 'background: rgba(243, 217, 232, 1)',
    },
    {
      id: '3',
      image: Images.ProductCard,
      title: 'Posh Pro 1500',
      rate: '$999.99',
      flavors: '5 Flavours',
      old_rate: '$1299.99',
      bgColor: 'rgba(186, 199, 238, 1)',
    },
  ];

  const images = [
    require('../../assets/images/banner.jpg'),
    require('../../assets/images/banner.jpg'),
    require('../../assets/images/banner.jpg'),
  ];
  const handleHideModal = () => {
    setConfirmationVisible(false);
  };

  const handleShowModal = () => {
    setConfirmationVisible(true);
  };
  const handleNavigation = (screenName: string) => {
    setConfirmationVisible(true);
    if (isAuthenticated) {
      navigation.navigate(screenName);
    }
  };

  const handleCreateAccount = async () => {
    setConfirmationVisible(false);
    await navigation.navigate('SignInScreen');
  };

  useFocusEffect(
    useCallback(() => {
      setConfirmationVisible(false);
    }, []),
  );

  return (
    <View style={styles.container}>
      <DynamicStatusBar color={'#467BE9'} />
      {!isAuthenticated && isConfirmationVisible && (
        <Model
          isVisible={isConfirmationVisible}
          modalImage={Images.CreateAmount}
          title={'Create an Account'}
          description={
            "with us and you'll be able to Check out faster Save multiple shipping addresses Access your order history Track new orders Save items to your wish list"
          }
          buttonText={'Create'}
          onClose={handleHideModal}
          onPageRedirect={handleCreateAccount}
        />
      )}
      {/* <View style={styles.logoContainer}>
        <LinearGradient style={styles.container} colors={['#467BE9', '#467BE9', '#AC6FEC']}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
            }}>
            <Images.Location />
            <TouchableOpacity style={{marginLeft: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.POPPINS_REGULAR,
                  color: Colors.DEFAULT_WHITE,
                }}>
                St 879 Forte, New york United Status
              </Text>
            </TouchableOpacity>
          </View>  <View
            style={{
              padding: 12,
              borderRadius: 10,
              marginHorizontal: 15,
              marginTop: 12,
              backgroundColor: Colors.DEFAULT_WHITE,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AllStores');
              }}
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: Fonts.POPPINS_REGULAR,
                  color: Colors.LIGHT_GRAY,
                }}>
                Search by store
              </Text>
              <Images.Search />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View> */}

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.BG_COLOR,
        }}>
        {/* <Banners images={images} /> */}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              handleNavigation('VerifyProductScreen');
            }}>
            <Images.VerifyProducts style={styles.image} />
            <Text style={styles.text}>Verify Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: '#FF4141',
                borderColor: '#FF4141',
              },
            ]}
            onPress={() => {
              handleNavigation('WinRewardScreen');
            }}>
            <Image
              source={require('../../assets/images/win_rewards.png')}
              style={[styles.image]}
            />
            <Text style={styles.text}>Win Rewards</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: '#DF9F3B',
                borderColor: '#DF9F3B',
              },
            ]}
            onPress={() => {
              handleNavigation('ComplainCenterScreen');
            }}>
            <Images.ComplainCenter style={styles.image} />
            <Text style={styles.text}>Complain Center</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleNavigation('SpinAndWinScreen');
            }}
            style={[
              styles.card,
              {
                backgroundColor: '#68CDBD',
                borderColor: '#68CDBD',
              },
            ]}>
            <Images.Spin style={styles.image} />
            <Text style={styles.text}>Spin & Win</Text>
          </TouchableOpacity>
        </View>
        {/* Products */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontFamily: Fonts.POPPINS_SEMI_BOLD,
                color: Colors.DEFAULT_BLACK,
                fontSize: 15,
              }}>
              Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllProducts');
            }}>
            <Text
              style={{
                fontFamily: Fonts.POPPINS_REGULAR,
                color: Colors.Product_Theme,
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ProductCard
                image={item.image}
                title={item.title}
                rate={item.rate}
                old_rate={item.old_rate}
                flavors={item.flavors}
                bgColor={item.bgColor}
              />
            )}
          />
        </View>
        <View style={{marginBottom: 40}}></View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    // backgroundColor: '#467BE9',
    height: verticalScale(100),
    width: '100%',
  },
  logoImage: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    height: 170,
    backgroundColor: '#29AC44',
    borderWidth: 1,
    borderColor: '#29AC44',
    borderRadius: 8,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  text: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DEFAULT_WHITE,
  },
});
