import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Popover from 'react-native-popover-view';

import {
  AddToDo,
  Container,
  Header,
  ListEmptyLoader,
  Loader,
  ToDoItem,
} from '../components';
import {TodoServices, Todo} from '../api/todoServices';
import {useAuth0} from 'react-native-auth0';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/reducers/authSlice';
import {COLORS} from '../constants/colors';

const ToDoListScreen = () => {
  const dispatch = useDispatch();
  const {clearSession} = useAuth0();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalTodos, setTotalTodos] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [paginationLoading, setPaginationLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const fetchTodos = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await TodoServices.getTodos(page, 10);
      setTodos(prevTodos =>
        page === 1 ? response.todos : [...prevTodos, ...response.todos],
      );
      setTotalTodos(response.total);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
      if (paginationLoading) {
        setPaginationLoading(false);
      }
    }
  };

  const handleAddTodo = async (todoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);

    try {
      const response = await TodoServices.addTodo({
        todo: todoText,
        completed: false,
        userId: 5,
      });

      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === newTodo.id ? {...todo, id: response.id} : todo,
        ),
      );
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleComplete = async (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? {...todo, completed: true} : todo,
      ),
    );

    try {
      await TodoServices.updateTodo(id, {completed: true});
    } catch (error) {
      console.error('Error marking todo as complete:', error);
    }
  };

  const handleDelete = async (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));

    try {
      await TodoServices.deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleLogout = () => {
    setLogoutLoader(true);
    clearSession()
      .then(() => {
        dispatch(logout());
      })
      .catch(err => console.log('logoutError', err))
      .finally(() => setLogoutLoader(false));
  };

  const handleLoadMore = () => {
    if (!loading && todos.length < totalTodos) {
      setPaginationLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Container style={styles.container}>
      <Header
        containerStyle={styles.headerContainer}
        titleStyle={styles.headerTitle}
        title="Hi There!"
        leftIconHidden={true}
        rightIcon={
          <Popover
            isVisible={menuVisible}
            onRequestClose={() => setMenuVisible(false)}
            popoverStyle={styles.popover}
            from={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Icon name="menu" size={30} color="#fff" />
              </TouchableOpacity>
            }>
            <View style={styles.menu}>
              <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                <Icon name="logout" size={20} color="red" />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Popover>
        }
        rightIconVisible={true}
      />

      <AddToDo onAdd={handleAddTodo} />

      <FlatList
        data={todos}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({item}) => (
          <ToDoItem
            key={item.id}
            todo={item}
            onComplete={() => handleComplete(item?.id)}
            onDelete={() => handleDelete(item?.id)}
          />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.008}
        ListFooterComponent={
          paginationLoading ? (
            <ActivityIndicator size="small" color={COLORS.BLUE_GROTTO} />
          ) : null
        }
        ListEmptyComponent={<ListEmptyLoader loading={loading} />}
        keyExtractor={(item, index) => `${item.id}_${index}`}
      />
      <Loader loading={logoutLoader} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  headerContainer: {
    backgroundColor: '#121212',
  },
  headerTitle: {
    color: 'white',
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
  flatListContainer: {
    paddingBottom: 30,
  },
});

export default ToDoListScreen;
