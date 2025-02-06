import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {Todo} from '../api/todoServices';

interface ToDoItemProps {
  todo: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({todo, onComplete, onDelete}) => {
  return (
    <View style={[styles.item, todo.completed && styles.completed]}>
      {/* Checkbox on Left */}
      <TouchableOpacity onPress={onComplete} style={styles.checkbox}>
        <FeatherIcon
          name={todo.completed ? 'check-square' : 'square'}
          size={26}
          color={todo.completed ? '#4CAF50' : '#888'}
        />
      </TouchableOpacity>

      <Text style={[styles.text, todo.completed && styles.textCompleted]}>
        {todo.todo}
      </Text>

      <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
        <FeatherIcon name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#2C2C2C',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 2, height: 2},
  },
  completed: {
    backgroundColor: '#1E1E1E',
  },
  checkbox: {
    padding: 2,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    flex: 1,
    color: '#E0E0E0',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  iconButton: {
    padding: 8,
  },
});

export {ToDoItem};
