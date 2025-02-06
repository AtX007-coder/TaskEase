import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../constants/colors';

interface CustomInputTextProps extends TextInputProps {
  borderColorFocused?: string;
  borderColorBlurred?: string;
  containerStyle?: ViewStyle;
}

const CustomInputText: React.FC<CustomInputTextProps> = ({
  borderColorFocused = COLORS.BABY_BLUE,
  borderColorBlurred = COLORS.GREY,
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {borderColor: isFocused ? borderColorFocused : borderColorBlurred},
        containerStyle,
      ]}>
      <TextInput
        {...props}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
});

export {CustomInputText};
