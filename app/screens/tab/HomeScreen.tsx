import React from 'react';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {Button, Text, View} from 'react-native';
import {ScreenEnum} from '../types';

export const HomeScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title={'Details'}
        onPress={() => navigation.navigate(ScreenEnum.DetailsScreen)}
      />
    </View>
  );
};
