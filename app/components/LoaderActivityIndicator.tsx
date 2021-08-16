import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const LoaderActivityIndicator = ({
  loadingMore,
}: {
  loadingMore: boolean;
}) => {
  return loadingMore ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {marginTop: 10, alignItems: 'center'},
});
