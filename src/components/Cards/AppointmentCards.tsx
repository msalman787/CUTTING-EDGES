import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../constants';
import Icon from 'react-native-vector-icons/Feather';

const AppointmentCards = ({
  id,
  title,
  customer_name,
  phone,
  date,
  onAccept,
  onReject,
  others,
  type,
  packageId,
  onRemovePackage,
}: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.title}>
            <Icon name="package" size={22} color="black" />
            <Text style={styles.description}> {title}</Text>
          </Text>
          <Text style={styles.title}>
            <Icon name="tag" size={22} color="black" />
            <Text style={styles.description}> {type || ''}</Text>
          </Text>
          <Text style={styles.title}>
            <Icon name="user" size={22} color="black" />
            <Text style={styles.description}> {customer_name}</Text>
          </Text>
          <Text style={styles.title}>
            <Icon name="phone" size={22} color="black" />
            <Text style={styles.description}> {phone}</Text>
          </Text>
          <Text style={styles.title}>
            <Icon name="calendar" size={22} color="black" />
            <Text style={styles.description}> {date}</Text>
          </Text>
          <Text style={styles.title}>
            <Icon name="package" size={22} color="black" />
            <Text style={styles.description}> {others}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.horizontalBorder} />
      <View style={styles.rowContainer}>
        {/* <TouchableOpacity
          onPress={() => {
            onRemovePackage(packageId);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Remove package</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => {
            onAccept(id);
          }}
          style={[
            styles.button,
            {
              backgroundColor: 'rgba(227, 255, 233, 1)',
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              {
                color: 'rgba(41, 172, 68, 1)',
              },
            ]}>
            Accept
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onReject(id);
          }}
          style={styles.button}>
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
    justifyContent: 'space-around',
  },

  titleDescriptionContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
  description: {
    fontSize: 14,
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
    backgroundColor: 'rgba(255, 226, 226, 1)',
    borderRadius: 10,
  },
  buttonText: {
    color: 'rgba(255, 65, 65, 1)',
    fontSize: 12,
    fontFamily: Fonts.POPPINS_REGULAR,
  },
});

export default AppointmentCards;
