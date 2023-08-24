import React from 'react';
import { StyleSheet, Text } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import { Colors, Fonts } from '../../constants';

const TextSeemore = ({ description, numberOfLines }:any) => {
  const renderViewMore = (onPress:any) => (
    <Text style={styles.seeMoreButton} onPress={onPress}>
      See more
    </Text>
  );

  const renderViewLess = (onPress:any) => (
    <Text style={styles.seeMoreButton} onPress={onPress}>
      See less
    </Text>
  );

  return (
    <ViewMoreText
      numberOfLines={numberOfLines || 4}
      renderViewMore={renderViewMore}
      renderViewLess={renderViewLess}
      textStyle={styles.text}>
      <Text>{description}</Text>
    </ViewMoreText>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontFamily: Fonts.POPPINS_REGULAR,
    color: Colors.DEFAULT_BLACK,
    fontSize: 12,
  },
  seeMoreButton: {
    color: 'rgba(66, 75, 238, 1)',
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
});

export default TextSeemore;
