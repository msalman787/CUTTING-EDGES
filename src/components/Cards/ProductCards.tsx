import {StyleSheet, Text, View} from 'react-native';
import { Colors, Fonts } from '../../constants';

const ProductCard = ({image, title, rate, old_rate, flavors, bgColor}: any) => {
  const Icon = image;
  return (
    <View style={styles.card}>
      <View
        style={{
          backgroundColor: bgColor,
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <Icon style={styles.image} />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <Text
          style={[
            styles.title,
            {
              fontWeight: 'bold',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.title,
            {
              color: Colors.LIGHT_GRAY,
              fontSize: 12,
              fontFamily: Fonts.POPPINS_LIGHT,
            },
          ]}>
          {flavors}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Text style={styles.rate}>{rate}</Text>
          <Text style={styles.oldrate}>{old_rate}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    card: {
      width: 150,
      height: 200,
      marginHorizontal: 10,
      borderColor: Colors.DEFAULT_WHITE,
      backgroundColor: Colors.DEFAULT_WHITE,
      borderRadius: 8,
    },
    image: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      marginBottom: 5,
    },
    title: {
      fontSize: 14,
      fontFamily: Fonts.POPPINS_REGULAR,
      color: Colors.DEFAULT_BLACK,
    },
    rate: {
      fontSize: 14,
      color: Colors.DEFAULT_BLACK,
      fontWeight: 'bold',
    },
    oldrate: {
      fontSize: 14,
      marginLeft: 10,
      color: 'red',
      textDecorationLine: 'line-through',
      fontWeight: 'bold',
    },
  });
  
