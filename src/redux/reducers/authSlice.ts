import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  user: any | null;
  accessToken: string | null | undefined;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{user: any; accessToken?: string}>,
    ) => {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload?.accessToken || '';
      state.isAuthenticated = true;
    },

    logout: state => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
