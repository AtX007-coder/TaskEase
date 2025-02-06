import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../constants/colors';

interface ThemedButtonProps {
  title?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const CustomButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
      <Text style={[styles.text, textStyle]}>{title || 'Button'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.BLUE_GROTTO,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});

export {CustomButton};
