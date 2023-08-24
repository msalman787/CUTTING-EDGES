import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {Colors, Fonts} from '../../constants';

const RewardCards = ({card, onLinkShare, handleRedirect}: any) => {
  let CardImage = card.image;
  return (
    <View style={styles.cardContainer}>
      <CardImage style={styles.image} resizeMode="cover" />
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{card.description}</Text>
      </View>
      <View style={styles.rangeSliderContainer}>
        <ProgressBar
          color="rgba(70, 123, 233, 1)"
          styleAttr="Horizontal"
          indeterminate={false}
          progress={card.statusValue}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.footerText}>{card.footerText}</Text>
        <Text style={[styles.footerText, {color: Colors.LIGHT_GRAY}]}>
          {card?.status}
        </Text>
      </View>

      {card?.status ? null : (
        <TouchableOpacity
          onPress={card.statusValue === 1 ? handleRedirect : onLinkShare}
          style={styles.button}>
          <Text style={styles.buttonText}>{card.action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RewardCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    borderRadius: 30,
    padding: 15,
    margin: 10,
    shadowColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: '#29292E',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 55,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  descriptionText: {
    textAlign: 'left',
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 14,
  },
  rangeSliderContainer: {
    width: '100%',
  },
  footerText: {
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
  button: {
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.DEFAULT_BLACK,
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});
