import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {verticalScale} from '../utils/Dimentions';
import {Colors, Fonts, Images} from '../constants';
import { AddToCardScreen, AllProducts, HomeScreen, LikeScreen, NotificationScreen, ProfileScreen } from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            elevation: 80,
            height: verticalScale(80),
            shadowOffset: {
              width: 0,
              height: 20,
            },
            shadowOpacity: 1,
            shadowRadius: 80,
            backgroundColor: Colors.DEFAULT_WHITE,
          },
        }}
        >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarHideOnKeyboard:true,
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {focused ? (
                    <Images.Home_Blue
                      resizeMode="contain"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <Images.Home resizeMode="contain" width={30} height={30} />
                  )}
                  <Text
                    style={{
                      color: focused ? Colors.Product_Theme : Colors.LIGHT_GRAY,
                      fontSize: verticalScale(11),
                      marginTop: verticalScale(3),
                      fontFamily:Fonts.POPPINS_SEMI_BOLD
                    }}>
                    Home
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="LikesScreen"
          component={LikeScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {focused ? (
                  <Images.Like_Blue
                    resizeMode="contain"
                    width={31}
                    height={31}
                  />
                  ) : (
                    <Images.Like
                      resizeMode="contain"
                      width={31}
                      height={31}
                    />
                  )}
                  <Text
                    style={{
                      color: focused ? Colors.Product_Theme : Colors.LIGHT_GRAY,
                      fontSize: verticalScale(11),
                      marginTop: verticalScale(3),
                      fontFamily:Fonts.POPPINS_SEMI_BOLD
                    }}>
                    Wishlist
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="AddToCard"
          component={AddToCardScreen}
          options={{
            tabBarIcon: () => {
              return (
                <View
                  style={{
                    position: 'absolute',
                    bottom: verticalScale(10),
                  }}>
                  <Images.Products />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',

                    justifyContent: 'center',
                  }}>
                  {focused ? (
                  <Images.Notification
                    resizeMode="contain"
                    width={focused ? 30 : 30}
                    height={focused ? 30 : 30}
                  />
                  ) : (
                    <Images.Notification_Blue
                      resizeMode="contain"
                      width={focused ? 30 : 30}
                      height={focused ? 30 : 30}
                    />
                  )}
                  <Text
                    style={{
                      color: focused ? Colors.Product_Theme : Colors.LIGHT_GRAY,
                      fontSize: verticalScale(11),
                      marginTop: verticalScale(3),
                      fontFamily:Fonts.POPPINS_SEMI_BOLD
                    }}>
                    Notification
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {focused ? (
                  <Images.User_Blue
                    resizeMode="contain"
                    width={focused ? 30 : 30}
                    height={focused ? 30 : 30}
                  />
                  ) : (
                    <Images.User
                      resizeMode="contain"
                      width={focused ? 30 : 30}
                      height={focused ? 30 : 30}
                    />
                  )}
                  <Text
                    style={{
                      color: focused ? Colors.Product_Theme : Colors.LIGHT_GRAY,
                      fontSize: verticalScale(11),
                      marginTop: verticalScale(3),
                      fontFamily:Fonts.POPPINS_SEMI_BOLD
                    }}>
                    Profile
                  </Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigation;

