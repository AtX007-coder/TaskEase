import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {COLORS} from '../constants/colors';

interface ActivityLoaderProps {
  loading: boolean;
}

const Loader = ({loading}: ActivityLoaderProps) => {
  return (
    <Modal visible={loading} animationType="none" transparent>
      <View pointerEvents="none" style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={COLORS.TRANSPARENT}
        />
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            animating={loading}
            size={'large'}
            color={COLORS.MINT_CREAM}
          />
        </View>
      </View>
    </Modal>
  );
};

Loader.defaultProps = {
  loading: false,
};

export {Loader};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
