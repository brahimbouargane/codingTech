import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../reducers/messageSlice";
import authApiSlice from "../services/authApiSlice";

const user = JSON.parse(localStorage.getItem("user"));


const handleError = (thunkAPI, error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  thunkAPI.dispatch(setMessage(message));
  return thunkAPI.rejectWithValue();
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await authApiSlice.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      return handleError(thunkAPI, error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await authApiSlice.login(username, password);
      return { user: data };
    } catch (error) {
      return handleError(thunkAPI, error);
    }
  }
);

export const logoutUser = createAsyncThunk("logout", async () => {
   authApiSlice.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        window.localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
        state.user = action.payload.user;
        window.localStorage.setItem("user", JSON.stringify(state.user.token));

      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") && action.meta.arg === registerUser,
        (state) => {
          state.isLoggedIn = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") && action.meta.arg === loginUser,
        (state) => {
          state.isLoggedIn = false;
          state.user = null;
        }
      );
  },
});

export default authSlice.reducer;
