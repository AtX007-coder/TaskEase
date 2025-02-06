import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

type TodoState = Todo[];

const initialState: TodoState = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter(item => item.id !== action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const {addTodo, toggleComplete, deleteTodo, setTodos} =
  todoSlice.actions;
export default todoSlice.reducer;
