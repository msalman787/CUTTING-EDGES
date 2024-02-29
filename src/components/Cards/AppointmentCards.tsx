import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native';
import {Colors, Fonts} from '../../constants';
import Icon from 'react-native-vector-icons/Feather';
import LargeButton from '../Buttons/Button';

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
  arImage,
  onPaid,
  isPaid,
}: any) => {
  const [ARModal, setARModal] = useState<boolean>(false);
  return (
    <View style={styles.card}>
      <Modal animationType="fade" transparent={true} visible={ARModal}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {height: '60%'}]}>
            <Image
              source={{
                uri: arImage,
              }}
              style={{
                width: '100%',
                height: '90%',
              }}
              resizeMode="contain"
            />
            <View
              style={[
                styles.modelButtons,
                {
                  marginTop: 10,
                },
              ]}>
              <LargeButton
                onPress={() => {
                  setARModal(false);
                }}
                text={'Close'}
              />
            </View>
          </View>
        </View>
      </Modal>
      {arImage && (
        <Text
          style={{
            marginTop: 5,
            marginBottom: 10,
            fontWeight: 'bold',
            fontSize: 18,
            alignSelf: 'center',
          }}
          onPress={() => {
            setARModal(true);
          }}>
          View AR
        </Text>
      )}
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
        {isPaid ? (
          <TouchableOpacity
            onPress={() => {
              onPaid(id);
            }}
            style={[
              styles.button,
              {
                backgroundColor: Colors.DEFAULT_BLACK,
                width: '50%',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: Colors.DEFAULT_WHITE,
                },
              ]}>
              Paid
            </Text>
          </TouchableOpacity>
        ) : (
          <>
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
          </>
        )}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
  },
  modalView: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    backgroundColor: Colors.BG_COLOR,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '35%',
    textAlignVertical: 'center',
  },
  modelButtons: {
    marginHorizontal: 10,
    width: '100%',
  },
});

export default AppointmentCards;
