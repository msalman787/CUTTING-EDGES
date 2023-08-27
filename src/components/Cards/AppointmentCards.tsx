import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../constants';

const AppointmentCards = ({title, date, onAccept , onReject}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.description}>{date}</Text>
          </View>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View style={styles.rowContainer}>
        <TouchableOpacity
        onPress={onAccept}
          style={[
            styles.button,
            {
              backgroundColor: "rgba(227, 255, 233, 1)",
              marginRight:10
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              {
                color: "rgba(41, 172, 68, 1)",
              },
            ]}>
            Accept
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onReject} style={styles.button}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  titleDescriptionContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
  },
  description: {
    fontSize: 12,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'rgba(105, 119, 132, 1)',
  },
  horizontalBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    marginVertical: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor:"rgba(255, 226, 226, 1)",
    borderRadius: 10,
  },
  buttonText: {
    color: "rgba(255, 65, 65, 1)",
    fontSize: 12,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});

export default AppointmentCards;