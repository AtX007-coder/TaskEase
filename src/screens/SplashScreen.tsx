import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {IMAGES} from '../assets/images';
import {RootState} from '../redux/store/store';

const SplashScreen: React.FC = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      if (isAuthenticated) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'ToDoList'}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Login'}],
          }),
        );
      }
    });
  }, [fadeAnim, isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={IMAGES.TASK_EASE_LOGO}
        style={[styles.logo, {opacity: fadeAnim}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002b52',
  },
  logo: {
    resizeMode: 'contain',
    height: 200,
    width: 200,
  },
});

export default SplashScreen;
