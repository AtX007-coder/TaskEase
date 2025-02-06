import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {LOTTIE} from '../assets/lottie';
import LottieView from 'lottie-react-native';

const EmptyLottie = ({
  lottieFile = LOTTIE.CALM_AFTERNOON,
  message = "No routines yet? Don't worry! Let's create your first routine to organize your day.",
}) => {
  return (
    <View style={styles.emptyStateContainer}>
      <LottieView
        style={styles.lottieImageStyle}
        source={lottieFile}
        autoPlay
        loop
      />
      <Text style={styles.emptyStateText}>{message}</Text>
    </View>
  );
};

export default EmptyLottie;

const styles = StyleSheet.create({
  emptyStateContainer: {
    alignItems: 'center',
    gap: 20,
    flex: 1,
  },
  emptyStateText: {
    textAlign: 'center',
  },
  lottieImageStyle: {
    width: '50%',
    height: '50%',
  },
});
