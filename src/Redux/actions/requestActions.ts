import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAppliedUserTaskList} from '../services/myRequestService';
import {RootStore} from '../store/store';

export const getAppliedByUserTask = createAsyncThunk(
  '/get-applied-user/1/',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await getAppliedUserTaskList(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);
