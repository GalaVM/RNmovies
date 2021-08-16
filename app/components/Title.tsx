import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {blackText} from '../styles/constants';

export const Title = ({text}: {text?: string}) => {
  return text ? <Text style={styles.text}>{text}</Text> : null;
};

const styles = StyleSheet.create({
  text: {
    color: blackText,
    fontWeight: '800',
    fontSize: 24,
  },
});
