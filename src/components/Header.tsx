import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

interface HeaderProps {
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIconVisible?: boolean;
  leftIconHidden?: boolean;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  containerStyle,
  titleStyle,
  rightIcon,
  leftIcon,
  rightIconVisible = false,
  leftIconHidden = false,
  onLeftIconPress,
  onRightIconPress,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContent}>
        {/* Left section with icon and title */}
        <View style={styles.leftSection}>
          {!leftIconHidden && (
            <TouchableOpacity onPress={onLeftIconPress}>
              {leftIcon || (
                <IonIcons
                  name="chevron-back"
                  size={24}
                  style={styles.leftIcon}
                  color={'red'}
                />
              )}
            </TouchableOpacity>
          )}
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>

        {/* Right icon */}
        {rightIconVisible && (
          <TouchableOpacity onPress={onRightIconPress}>
            {rightIcon || (
              <IonIcons
                name="ellipsis-vertical"
                size={24}
                style={styles.rightIcon}
                color={'red'}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 7,
    backgroundColor: COLORS.WHITE,
    borderBottomColor: COLORS.LIGHT_GREY,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
});

export {Header};
