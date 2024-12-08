import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('fetchUser', async page => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?results=10&page=${page}`,
    );
    return response.data;
  } catch (err) {
    return err;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUsers: state => {
      state.user = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = [...state.user, ...action.payload.results];
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearUsers} = userSlice.actions;
export default userSlice.reducer;
