import {combineReducers} from '@reduxjs/toolkit';

import authReducer, {logout} from './authSlice';
import todoReducer from './todoSlice';

const appReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logout.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
