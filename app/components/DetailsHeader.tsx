import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const DetailsHeader = ({title}: {title: string}) => {
  return <Text style={styles.text}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '800',
    fontSize: 16,
  },
});
