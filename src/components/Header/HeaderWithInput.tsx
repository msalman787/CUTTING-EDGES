import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/Dimentions';
import {Colors, Fonts, Images} from '../../constants';
import BackButton from '../Buttons/BackButton';
import ButtonIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const HeaderWithSearchInput = ({
  title,
  isInputVisible,
  searchText,
  onIconPress,
  onBackBtnPress,
  onSearchTextChange,
  image,
  showIcon,
  titleStyle,
  titleColor,
}: any) => {
  const Icon = image;
  const navigation:any = useNavigation();

  return (
    <View style={styles.container}>
      {!onBackBtnPress && <Image source={Images.LOGO} style={styles.image} resizeMode="cover" />}
      {onBackBtnPress && <BackButton onBackBtnPress={onBackBtnPress} />}
      {!isInputVisible && (
        <View
          style={[
            styles.titleContainer,
            {
              paddingVertical: !showIcon ? 10 : 0,
            },
          ]}>
          <Text
            style={[
              styles.title,
              {
                marginRight: titleStyle ? titleStyle : 0,
                color: titleColor ? Colors.DEFAULT_WHITE : Colors.DEFAULT_BLACK,
              },
            ]}>
            {title}
          </Text>
          {/* {showIcon && ( */}
            <TouchableOpacity style={styles.icon} onPress={()=>{
              navigation.navigate("AboutUsScreen")
            }}>
              <ButtonIcon name="info" size={25} color="black" />
            </TouchableOpacity>
          {/* )} */}
          {showIcon && (
            <TouchableOpacity style={styles.icon} onPress={onIconPress}>
              <ButtonIcon name={image} size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      )}
      {isInputVisible && (
        <View style={styles.inputContainer}>
          <TextInput
            cursorColor={Colors.INPUT_BORDER}
            style={styles.textInput}
            value={searchText}
            onChangeText={onSearchTextChange}
            autoFocus={true}
            placeholder="Search..."
          />
          {showIcon && (
            <TouchableOpacity style={styles.icon} onPress={onIconPress}>
              <Icon color="black" style={styles.searchIcon} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: 20,
    fontWeight: 'bold',
    flexGrow: 1,
    textAlign: 'center',
  },
  searchIcon: {
    margin: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderColor: Colors.BG_COLOR,
    borderWidth: 1,
    backgroundColor: 'rgba(247, 247, 249, 1)',
    fontFamily: Fonts.POPPINS_REGULAR,
    padding: 8,
    borderRadius: 10,
    width: horizontalScale(250),
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    marginVertical: verticalScale(5)
  },
  image: {
    width: 40,
    alignItems: 'center',
    height: 40,
    marginRight: 16,
    borderRadius: 150,
  },
});

export default HeaderWithSearchInput;
