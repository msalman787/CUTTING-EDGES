import {
  DefaultTheme,
  Provider,
  ThemeProvider,
} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {Colors} from '../../constants';

function Dropdown({
  label,
  value,
  handleChange,
  showDropDown,
  setShowDropDown,
  itemList,
}: any) {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.DEFAULT_WHITE,
    },
  };

  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <DropDown
          label={label}
          mode={'outlined'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={value}
          activeColor={`${Colors.DEFAULT_BLACK}`}
          setValue={handleChange}
          list={itemList}
          theme={theme}
          dropDownStyle={styles.safeContainerStyle}
        />
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeContainerStyle: {
    marginTop: -80,
    marginLeft: -10,
  },
});

export default Dropdown;
