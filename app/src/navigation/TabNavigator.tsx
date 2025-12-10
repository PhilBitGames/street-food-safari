import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import VendorsScreen from '../screens/VendorsScreen';
import VendorDetailsScreen from '../screens/VendorDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';

type RootTabParamList = {
  VendorsStack: undefined;
  FavoritesStack: undefined;
  About: undefined;
};

type VendorsStackParamList = {
  VendorsList: undefined;
  VendorDetails: { vendorId: string };
};

type FavoritesStackParamList = {
  FavoritesList: undefined;
  VendorDetails: { vendorId: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const VendorsStack = createNativeStackNavigator<VendorsStackParamList>();
const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

const VendorsStackNavigator = () => {
  return (
    <VendorsStack.Navigator>
      <VendorsStack.Screen 
        name="VendorsList" 
        component={VendorsScreen} 
        options={{ title: 'Vendors', headerShown: false }}
      />
      <VendorsStack.Screen 
        name="VendorDetails" 
        component={VendorDetailsScreen} 
        options={{ title: 'Vendor Details' }}
      />
    </VendorsStack.Navigator>
  );
};

const FavoritesStackNavigator = () => {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen 
        name="FavoritesList" 
        component={FavoritesScreen} 
        options={{ title: 'Favorites', headerShown: false }}
      />
      <FavoritesStack.Screen 
        name="VendorDetails" 
        component={VendorDetailsScreen} 
        options={{ title: 'Vendor Details' }}
      />
    </FavoritesStack.Navigator>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="VendorsStack"
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'VendorsStack') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'FavoritesStack') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else {
            iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="VendorsStack" 
        component={VendorsStackNavigator} 
        options={{ title: 'Vendors' }}
      />
      <Tab.Screen 
        name="FavoritesStack" 
        component={FavoritesStackNavigator} 
        options={{ title: 'Favorites' }}
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ title: 'About' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;