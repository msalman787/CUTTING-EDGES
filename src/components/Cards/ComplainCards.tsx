import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../constants';

const ComplainCards = ({title, date, status, onPress}: any) => {
    let bgColor, textColor;

    switch (status) {
      case 'Approved':
        bgColor = 'rgba(227, 255, 233, 1)';
        textColor = 'rgba(41, 172, 68, 1)';
        break;
      case 'Rejected':
        bgColor = 'rgba(255, 226, 226, 1)';
        textColor = 'rgba(255, 65, 65, 1)';
        break;
      default:
        bgColor = 'rgba(255, 248, 214, 1)';
        textColor = 'rgba(233, 202, 40, 1)';
    }
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
          style={[
            styles.button,
            {
              backgroundColor: bgColor,
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              {
                color: textColor,
              },
            ]}>
            {status}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{onPress(status)}} style={styles.button}>
          <Text style={styles.buttonText}>Details</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
    backgroundColor: Colors.DEFAULT_BLACK,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 12,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});

export default ComplainCards;
