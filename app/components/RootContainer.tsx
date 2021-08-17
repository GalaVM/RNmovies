import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {white} from '../styles/constants';

export const RootContainer = ({children}: {children: ReactNode}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  list: {
    paddingBottom: 90,
  },
});
