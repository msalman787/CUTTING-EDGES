import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts} from '../../constants';
import {HeaderWithSearchInput, RattingModal} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthenticated} from '../../store/auth/authSlice';
import {CommonActions} from '@react-navigation/native';
import {startLoading} from '../../store/apiLoader/apiLoaderSlice';
import apiResponseGenerator from '../../service/apiGenerator';
import {showModal} from '../../store/model/modelSlice';

const HomeScreen = ({navigation, route}: any) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  );
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);
  const [commentText, setCommentText] = useState('');
  const rating: any = route.params?.rating;
  const [isVisible, setIsVisible]: any = useState(true);
  console.log({rating});
  const handleLogout = async () => {
    await AsyncStorage.removeItem('authenticated');
    dispatch(setAuthenticated(false));
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'SignInScreen'}],
    });
    navigation.dispatch(resetAction);
  };
  const handleRatting = async () => {
    try {
      dispatch(startLoading());
      const response = await apiResponseGenerator({
        method: 'post',
        url: `api/saveratings/${rating[0]?.package_id}/${ratingValue}/${commentText}`,
      });
      if (response) {
        setIsVisible(false);
        return;
      }
    } catch (error: any) {
      dispatch(showModal({description: error.message}));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderWithSearchInput
          onIconPress={handleLogout}
          showIcon={isAuthenticated}
          titleStyle={!isAuthenticated ? 50 : 0}
          image={'log-out'}
          title="CUTTING EDGES"
        />
      </View>
      {rating?.length > 0 && isVisible && (
        <RattingModal
          isVisible={isVisible}
          onPress={handleRatting}
          ratingValue={ratingValue}
          commentText={commentText}
          setCommentText={setCommentText}
          setRatingValue={setRatingValue}
        />
      )}
      <View style={styles.row}>
        <Image
          source={require('../../assets/images/banner.jpg')}
          style={[styles.image1]}
        />
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen', {name: 'haircuts'});
          }}>
          <Image
            source={require('../../assets/images/new-look1.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Hair Cut / Beard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen', {name: 'grooms'});
          }}>
          <Image
            source={require('../../assets/images/groom.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Groom Packages</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen', {name: 'massage'});
          }}>
          <Image
            source={require('../../assets/images/massage.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Massage Packages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('AllPackageScreen', {name: 'faicials'});
          }}>
          <Image
            source={require('../../assets/images/facial.jpg')}
            style={[styles.image]}
          />
          <Text style={styles.text}>Facial Packages</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    height: 220,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 8,
    margin: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image1: {
    flex: 1,
    width: '100%',
    height: 250,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 120,
    marginBottom: 8,
    borderRadius: 10,
    marginVertical: 20,
  },
  text: {
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DEFAULT_BLACK,
    marginBottom: 10,
  },
});
