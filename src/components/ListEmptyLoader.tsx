import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../assets/images';
import {COLORS} from '../constants/colors';

const ListEmptyLoader = ({loading = false}) => {
  return (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.BLUE_GROTTO} />
      ) : (
        <>
          <Text style={styles.emptyText}>No data found</Text>
          <Image source={IMAGES.NO_DATA} style={styles.emptyImage} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  emptyImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export {ListEmptyLoader};
