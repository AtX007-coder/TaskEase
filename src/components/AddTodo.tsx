import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {COLORS} from '../constants/colors';

interface AddToDoProps {
  onAdd: (todoText: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({onAdd}) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim() === '') {
      Alert.alert('Empty To-Do', 'Please enter a valid to-do item.');
      return;
    }

    onAdd(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        placeholderTextColor="#888"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
        activeOpacity={0.7}>
        <FeatherIcon name="plus-circle" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.MINT_CREAM,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 2, height: 2},
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {AddToDo};
