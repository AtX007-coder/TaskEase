import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Popover from 'react-native-popover-view';

interface HeaderProps {
  title: string;
  avatarUrl?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({title, avatarUrl, onLogout}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        {avatarUrl ? (
          <Image source={{uri: avatarUrl}} style={styles.avatar} />
        ) : (
          <FeatherIcon name="user" size={30} color="white" />
        )}
        <Text style={styles.headerTitle}>{title || 'Hi There!'}</Text>
      </View>

      <Popover
        isVisible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
        popoverStyle={styles.popover}
        from={
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <FeatherIcon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        }>
        <View style={styles.menu}>
          <TouchableOpacity onPress={onLogout} style={styles.menuItem}>
            <FeatherIcon name="log-out" size={20} color="red" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Popover>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  popover: {
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  menu: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 2, height: 2},
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export {Header};
