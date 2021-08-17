import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenEnum} from '../screens/types';
import {HomeScreen} from '../screens/tab/HomeScreen';
import {FavoriteFilmsScreen} from '../screens/tab/FavoriteFilmsScreen';
import {DetailsGeneralScreen} from '../screens/stack/DetailsGeneralScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabsStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ScreenEnum.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name={ScreenEnum.FavoriteFilmsScreen}
        component={FavoriteFilmsScreen}
        options={{
          tabBarIcon: () => null,
        }}
      />
    </Tab.Navigator>
  );
};
export const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={'TabsStack'} component={TabsStack} />
        <Stack.Screen
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
          }}
          name={ScreenEnum.DetailsScreen}
          component={DetailsGeneralScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
