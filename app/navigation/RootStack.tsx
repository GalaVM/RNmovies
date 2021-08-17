import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreenEnum} from '../screens/types';
import {HomeScreen} from '../screens/tab/HomeScreen';
import {FavoriteFilmsScreen} from '../screens/tab/FavoriteFilmsScreen';
import {DetailsScreen} from '../screens/stack/DetailsScreen';
import {HeaderRightBtn} from '../components/HeaderRightBtn';
import {DetailsHeader} from '../components/DetailsHeader';

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
          headerShown: true,
          headerTitle: 'Your favorite Movies',
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
          options={({route}: any) => ({
            headerShown: true,
            headerBackTitle: 'Back',
            headerRight: () => {
              return route?.params?.isFavorite ? (
                <HeaderRightBtn id={route?.params?.item?.id} />
              ) : null;
            },
            headerTitle: () => (
              <DetailsHeader title={route?.params?.item.filmTitle} />
            ),
          })}
          name={ScreenEnum.DetailsScreen}
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
