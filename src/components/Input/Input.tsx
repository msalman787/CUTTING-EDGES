import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Colors, Fonts, Images } from '../../constants';

const InputField = React.forwardRef((props: any, ref: any) => {
  const Icon = props.icon;
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Icon style={styles.icon} />
        <TextInput
          ref={ref}
          returnKeyType={props.returnKeyType}
          onSubmitEditing={props.onSubmitEditing}
          style={styles.inputField}
          onChangeText={props.onChange}
          keyboardType={props.keyboardType}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.LIGHT_GRAY}
          value={props.value}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize="none"
          onBlur={props.onBlur}
        />
        {props.passwordShow && (
          <Image source={props.icon} style={styles.icon} />
        )}
      </View>
      {props.errorMsg ? (
        <Text style={styles.errorMsg}>{props.errorMsg}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.INPUT_BORDER,
    paddingLeft: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputField: {
    paddingVertical: 11,
    paddingHorizontal: 2,
    color:Colors.DEFAULT_BLACK,
    flex: 1,
  },
  errorMsg: {
    marginTop: 8,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'red',
  },
});

export default InputField;
