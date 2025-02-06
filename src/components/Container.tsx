import React, {ReactNode} from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = props => {
  return (
    <SafeAreaView
      onTouchStart={() => Keyboard.dismiss()}
      style={[styles.containerStyle, props.style]}>
      <KeyboardAvoidingView style={{flex: 1}}>
        {props.children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export {Container};
