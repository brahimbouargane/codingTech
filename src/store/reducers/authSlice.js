import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../reducers/messageSlice";
import authApiSlice from "../services/authApiSlice";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk('login', async ({ username, password }, thunkAPI) => {
  try {
      const data = await authApiSlice.login(username, password);
      return { user: data };
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
  }
});

export const logout = createAsyncThunk("logout", async () => {
   authApiSlice.logout();
});

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
});

export default authSlice.reducer;
