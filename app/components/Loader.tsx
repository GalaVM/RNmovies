import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {blackText, white, screenHeight, screenWidth} from '../styles/constants';

export const Loader = ({isLoading}: {isLoading: boolean}) => {
  return (
    <>
      {isLoading && (
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: white,
    paddingTop: 120,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: blackText,
  },
});
