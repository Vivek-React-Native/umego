import {ChatConversationListAsync} from '../services/chatServices';

import {createAsyncThunk, ThunkAction} from '@reduxjs/toolkit';
import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
  PaginationListModel,
  SendMessageModel,
  ChatModel,
} from '../../Models/ChatModels';
import {ChatPaginationAsync, SendMessageAsync} from '../services/chatServices';
import {RootStore} from '../store/store';

export const paginationList = createAsyncThunk(
  '/inobx-pagination-listing',
  async (data: PaginationListModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await ChatPaginationAsync(data, token);
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

export const sendMessage = createAsyncThunk(
  '/send-message',
  async (data: SendMessageModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await SendMessageAsync(data, token);
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
export const chatConversationList = createAsyncThunk(
  'chat/conversationList',
  async (data: ChatModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await ChatConversationListAsync(data, token);
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
