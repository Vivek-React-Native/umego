import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  CancelHireRequestModel,
  UpdateHireRequestStatusModel,
  CoordinateTaskModel,
  HireRequestModel,
  DeletionRequestModel,
  ReportTaskModel,
  SendPaymentModel,
  RateTaskModel,
} from '../../Models/TaskModels';
import {
  GetTaskById,
  CancelHireRequest,
  UpdateHireRequestStatus,
  CoordinateTask,
  HireRequest,
  OpenTaskList,
  GetAllMyTask,
  GetTaskHistoryAsync,
  GetAppliedUserByTaskID,
  GetAppliedUserList,
  UpdateCoordinateTaskRequestStatus,
  ReportTask,
  SendPayment,
  RateTaskAsync,
  GetMyAppliedTaskList,
  GetAppliedUsersByTaskIdAsync,
  GetPaymentHistory,
} from '../services/taskService';
import {RootStore} from '../store/store';

export const getTaskById = createAsyncThunk(
  '/get-task-by-id',
  async (id: Number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetTaskById(token, id);
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

export const cancelHireRequest = createAsyncThunk(
  '/cancel-hire-request',
  async (data: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await CancelHireRequest(token, data);
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

export const addSelectedServiceProvider = createAction<any>('incrementBy');

export const updateHireRequestStatus = createAsyncThunk(
  '/update-hire-request-status',
  async (data: UpdateHireRequestStatusModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await UpdateHireRequestStatus(data);
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

export const coordinateTask = createAsyncThunk(
  '/coordinate_task',
  async (data: CoordinateTaskModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await CoordinateTask(data, token);
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

export const hireRequest = createAsyncThunk(
  '/hire-request',
  async (data: HireRequestModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await HireRequest(token, data);
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

export const getOpenTaskList = createAsyncThunk(
  '/get-open-task-list',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;

      const token = state.global.token;
      return await OpenTaskList(token);
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

export const getAllMyTask = createAsyncThunk(
  '/get-all-task-by-token',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetAllMyTask(token);
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

export const getTaskHistory = createAsyncThunk(
  '/get-task-history',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetTaskHistoryAsync(token);
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

export const getPaymentHistory = createAsyncThunk(
  '/get-payment-history',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetPaymentHistory(token);
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

export const getAppliedUserByTaskID = createAsyncThunk(
  `/get-applied-user`,
  async (id: Number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetAppliedUserByTaskID(token, id);
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
export const getAppliedTaskList = createAsyncThunk(
  `/get-applied-list`,
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetAppliedUserList(token);
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

export const updateCoordinateTaskRequestStatus = createAsyncThunk(
  '/update-coordinate-task-request-status',
  async (data: {coordinate_status: number; taskId: number}, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await UpdateCoordinateTaskRequestStatus(data, token);
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

export const reportTask = createAsyncThunk(
  '/report-task',
  async (data: ReportTaskModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await ReportTask(data, token);
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

export const sendPayment = createAsyncThunk(
  '/send-payment',
  async (data: SendPaymentModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await SendPayment(data);
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

export const rateTask = createAsyncThunk(
  '/rate-task-user',
  async (data: RateTaskModel, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await RateTaskAsync(data);
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

export const getMyAppliedTaskList = createAsyncThunk(
  '/get-my-applied-task-list/',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetMyAppliedTaskList(token);
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

export const getAppliedUserById = createAsyncThunk(
  'tasks/get-applied-user-by-task-id/',
  async (data: number, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootStore;
      const token = state.global.token;
      return await GetAppliedUsersByTaskIdAsync(data, token);
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
