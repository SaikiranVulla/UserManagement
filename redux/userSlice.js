import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getUser = createAsyncThunk('fetchUser', async page => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?results=10&page=${page}`,
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return [...state, ...action.payload.results];
    });
  },
});

export default userSlice.reducer;
