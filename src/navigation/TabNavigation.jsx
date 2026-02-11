
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Home, ShoppingCart, Heart } from 'lucide-react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import CartScreen from '../screens/home/CartScreen';
import WishlistScreen from '../screens/home/WishlistScreen';
import HomeScreen from '../screens/home/HomeScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#E91E63',
        tabBarInactiveTintColor: '#818181',

        tabBarStyle: {
          height: responsiveWidth(15),
          backgroundColor: '#fff',
          elevation: 10,
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
        },

        tabBarIcon: ({ focused, color }) => {
          let Icon;
          switch (route.name) {
            case 'Home':
              Icon = Home;
              break;
            case 'Cart':
              Icon = ShoppingCart;
              break;
            case 'Wishlist':
              Icon = Heart;
              break;
            default:
              Icon = Home;
          }

          return (
            <View className="items-center justify-center">
              <Icon
                size={22}
                color={color}
                strokeWidth={focused ? 2.5 : 1.8}
                fill={route.name === 'Wishlist' && focused ? color : 'none'}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
