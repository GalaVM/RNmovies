import React from 'react';
import {StyleSheet, View, Modal, TouchableOpacity, Text} from 'react-native';
import {
  white,
  blackText,
  blackBackgroundOpacity,
  redError,
} from '../styles/constants';

interface ErrorToastProps {
  visible: boolean;
  handleClose: () => void;
  errorText: string;
}
export const ErrorToast = ({
  visible,
  handleClose,
  errorText,
}: ErrorToastProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.root}>
        <View style={styles.toast}>
          <Text style={styles.error}>{errorText}</Text>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.btnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: blackBackgroundOpacity,

    flexDirection: 'column-reverse',
  },
  error: {color: redError, fontSize: 24, marginBottom: 70},
  btnText: {
    color: blackText,
    fontSize: 18,
  },

  toast: {
    height: '50%',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 24,
    paddingHorizontal: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: white,
  },
});
