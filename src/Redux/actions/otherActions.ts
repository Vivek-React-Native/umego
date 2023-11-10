import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootStore} from '../store/store';
import {
  CreateOrUpdateBankDetailsAsync,
  CreateTaskAsync,
  GetCategoriesAsync,
  GetOpenTaskListAsync,
  GetProfileInfoAsync,
  GetSubCategoriesAsync,
  UpdateProfileAsync,
  UploadMediaAsync,
} from '../services/otherServices';
import {CreateTaskModel} from '../../Models/TaskModels';
import {
  CreateOrUpdateBankDetailsModel,
  UpdateProfileModel,
} from '../../Models/UserModels';

export const getCategories = createAsyncThunk(
  'others/getCategories',
  async (data, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetCategoriesAsync(token);
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

export const getSubCategories = createAsyncThunk(
  'others/getSubCategories',
  async (mainCategoryId: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetSubCategoriesAsync(mainCategoryId, token);
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

export const createTask = createAsyncThunk(
  'others/createTask',
  async (data: CreateTaskModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await CreateTaskAsync(data, token);
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

export const getProfileInfo = createAsyncThunk(
  'others/getProfileInfo',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetProfileInfoAsync(token);
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

export const updateProfile = createAsyncThunk(
  'others/updateProfile',
  async (data: UpdateProfileModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await UpdateProfileAsync(data, token);
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

export const getOpenTaskList_Sefa = createAsyncThunk(
  'others/getOpenTaskList',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetOpenTaskListAsync(token);
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

export const createOrUpdateBankDetails = createAsyncThunk(
  'others/createOrUpdateBankDetails',
  async (data: CreateOrUpdateBankDetailsModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await CreateOrUpdateBankDetailsAsync(data, token);
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

export const uploadMedia = createAsyncThunk(
  'others/uploadMedia',
  async (data: any, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await UploadMediaAsync(data, token);
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
