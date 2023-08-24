import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import {
  getCurrentLocation,
  locationPermission,
} from '../../../utils/MapHelperFunctions';
import {Colors, Fonts, Images} from '../../../constants';
import {HeaderWithSearchInput} from '../../../components';
import {horizontalScale, verticalScale} from '../../../utils/Dimentions';
import { ActivityIndicator } from 'react-native-paper';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const NearByStores = ({navigation}: any) => {
  const [currentPosition, setCurrentPosition]: any = useState(null);
  const [nearbyStores, setNearbyStores]: any = useState([]);

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();

    if (locPermissionDenied) {
      const {longitude, latitude, heading}: any = await getCurrentLocation();
      setCurrentPosition({latitude, longitude});
    }
  };

  const latifabad7Banks = [
    {
      id: 1,
      latitude: 25.402789,
      longitude: 68.343271,
      name: 'ABC Bank',
      address: 'Latifabad 7, Hyderabad',
    },
    {
      id: 2,
      latitude: 25.40435,
      longitude: 68.341097,
      name: 'XYZ Bank',
      address: 'Latifabad 7, Hyderabad',
    },
    {
      id: 3,
      latitude: 25.402092,
      longitude: 68.339984,
      name: 'Bank of Latifabad',
      address: 'Latifabad 7, Hyderabad',
    },
    {
      id: 4,
      latitude: 25.401612,
      longitude: 68.341739,
      name: 'City Bank',
      address: 'Latifabad 7, Hyderabad',
    },
    {
      id: 5,
      latitude: 25.40189,
      longitude: 68.342805,
      name: 'Green Bank',
      address: 'Latifabad 7, Hyderabad',
    },
    {
      id: 6,
      latitude: 25.37821,
      longitude: 68.36633,
      name: 'NOW POSH',
      address: 'Hyderabad, Sindh 71000, Pakistan',
    },
  ];

  useEffect(() => {
    setNearbyStores(latifabad7Banks);
  }, []);

  const handleCloseInput = () => {
    navigation.goBack();
  };
  if (!currentPosition) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={Colors.DEFAULT_BLACK} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderWithSearchInput
          image={Images.List}
          onIconPress={handleCloseInput}
          isInputVisible={false}
          title="Nearby Stores"
          showIcon={true}
          onBackBtnPress={handleCloseInput}
        />
      </View>
      {currentPosition && (
        <MapView
          style={styles.map}
          provider={'google'}
          region={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {nearbyStores.map((store: any, index: number) => (
            <Marker
              key={index}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}>
              <Image source={Images.PoshMaker} style={styles.makerSize} />
              <Callout tooltip>
                <View style={styles.tooltipContainer}>
                  <Text style={styles.text}>Store Name</Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: Colors.LIGHT_GRAY,
                        fontFamily: Fonts.POPPINS_REGULAR,
                      },
                    ]}>
                    {store.name}
                  </Text>
                  <Text style={styles.text}>Address</Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        color: Colors.LIGHT_GRAY,
                        fontFamily: Fonts.POPPINS_REGULAR,
                      },
                    ]}>
                    {store.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: verticalScale(82),
  },
  storeImage: {
    width: 100,
    height: 100,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  tooltipContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    marginVertical: 5,
    borderRadius: 6,
    borderColor: Colors.INPUT_BORDER,
    borderWidth: 0.5,
    padding: 15,
    width: horizontalScale(220),
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 50,
    backgroundColor: Colors.Product_Theme,
  },
  makerSize: {
    width: horizontalScale(50),
    height: verticalScale(70),
  },
  text: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});

export default NearByStores;
