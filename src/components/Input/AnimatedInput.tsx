import React, {useState, forwardRef} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {Colors, Fonts} from '../../constants';
import {TextInput, DefaultTheme} from 'react-native-paper';

const AnimatedInput = forwardRef(
  (
    {
      label,
      value,
      errorMsg,
      onChangeText,
      keyboardType,
      editable,
      secureTextEntry,
      onSubmitEditing,
      returnKeyType,
      leftIcon
    }: any,
    ref: any,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: Colors.DEFAULT_BLACK,
        background: Colors.DEFAULT_WHITE,
        text: Colors.DEFAULT_BLACK,
      },
      fonts: {
        ...DefaultTheme.fonts,
        regular: Fonts.POPPINS_SEMI_BOLD,
      },
      roundness: 5,
    };

    return (
      <View style={styles.container}>
        <TextInput
          ref={ref}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          keyboardType={keyboardType}
          cursorColor={Colors.DEFAULT_BLACK}
          outlineColor={Colors.INPUT_BORDER}
          mode="flat"
          underlineColor={Colors.DEFAULT_BLACK}
          label={label}
          style={[styles.textInput]}
          value={value}
          secureTextEntry={secureTextEntry && !passwordVisible}
          // right={
          //   secureTextEntry ? (
          //     <TextInput.Icon
          //       style={{marginTop: 6}}
          //       color={Colors.DEFAULT_BLACK}
          //       icon={passwordVisible ? 'eye-off' : 'eye'}
          //       onPress={() => setPasswordVisible(!passwordVisible)}
          //     />
          //   ) : null
          // }
          left={
            leftIcon ? (
              <TextInput.Icon
                style={{marginTop: 6}}
                color={Colors.DEFAULT_BLACK}
                icon={leftIcon}
              />
            ) : null
          }
          onChangeText={onChangeText}
          theme={theme}
        />

        {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
      </View>
  );
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    marginVertical: 15,
  },
  textInput: {
    width: '100%',
    backgroundColor:Colors.DEFAULT_WHITE
  },
  errorMsg: {
    marginTop: 3,
    marginBottom: 2,
    fontFamily: Fonts.POPPINS_REGULAR,
    color: 'red',
  },
});

export default AnimatedInput;
