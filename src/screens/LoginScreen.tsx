import React, {useState} from 'react';
import {StyleSheet, Image, Text, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAuth0} from 'react-native-auth0';

import {IMAGES} from '../assets/images';
import {Container, CustomButton, Loader, Space} from '../components';
import {COLORS} from '../constants/colors';
import {loginSuccess} from '../redux/reducers/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {authorize, getCredentials} = useAuth0();
  const handleLogin = async () => {
    setLoading(true);
    try {
      await authorize({
        scope: 'openid profile email',
      });

      const credentials = await getCredentials();

      dispatch(
        loginSuccess({
          user: credentials?.user,
          accessToken: credentials?.accessToken,
        }),
      );
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Failed', error?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <Image
        source={IMAGES.TASK_EASE_LOGO}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to Task Ease</Text>
      <Text style={styles.subtitle}>
        Manage your tasks & boost productivity.
      </Text>

      <Space height={20} />

      <CustomButton
        title="Login with Auth0"
        onPress={handleLogin}
        style={styles.button}
        textStyle={styles.buttonText}
      />

      <Text style={styles.footerText}>
        Your time, your productivity, your control.
      </Text>

      {loading && <Loader loading={loading} />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.DARK_GREY,
  },
  logo: {
    marginTop: 160,
    width: 180,
    height: 180,
    marginBottom: 30,
    tintColor: COLORS.WHITE,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.WHITE,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.LIGHT_GREY,
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff9800',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    elevation: 5,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: COLORS.LIGHT_GREY,
    marginTop: 30,
    textAlign: 'center',
  },
});

export default LoginScreen;
