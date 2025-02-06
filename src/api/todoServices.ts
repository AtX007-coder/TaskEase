import apiClient from './axiosClient';
import {API_END_POINT} from './endPoints';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

export interface PaginatedResponse<T> {
  todos: T[];
  total: number;
  skip: number;
  limit: number;
}

const getTodos = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Todo>> => {
  try {
    const response = await apiClient.get<PaginatedResponse<Todo>>(
      API_END_POINT.TODOS,
      {
        params: {skip: (page - 1) * limit, limit},
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch todos');
  }
};

const getTodoById = async (id: number): Promise<Todo> => {
  try {
    const response = await apiClient.get<Todo>(`${API_END_POINT.TODOS}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch todo with ID ${id}`);
  }
};

const addTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  try {
    const body = JSON.stringify(newTodo);
    const response = await apiClient.post<Todo>(API_END_POINT.ADD_TODOS, body);
    console.log('addTodo response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to add todo');
  }
};

const updateTodo = async (
  id: number,
  updatedData: Partial<Todo>,
): Promise<Todo> => {
  try {
    const response = await apiClient.put<Todo>(
      `${API_END_POINT.TODOS}/${id}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update todo with ID ${id}`);
  }
};

const deleteTodo = async (id: number): Promise<{message: string}> => {
  try {
    const response = await apiClient.delete<{message: string}>(
      `${API_END_POINT.TODOS}/${id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete todo with ID ${id}`);
  }
};

export const TodoServices = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};
