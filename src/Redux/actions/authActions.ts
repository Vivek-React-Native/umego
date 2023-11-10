import { createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
// import { RootStateOrAny } from "react-redux";
import {
  CodeVerificationModel,
  LoginModel,
  SignUpModel,
} from '../../Models/AuthModels';
import {
  SignInAsync,
  SignUpAsync,
  VerifyCodeAsync,
} from '../services/authServices';

export const signin = createAsyncThunk(
  'auth/signin',
  async (data: LoginModel, thunkAPI) => {
    try {
      return await SignInAsync(data);
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

export const signUp = createAsyncThunk(
  'auth/signup',
  async (data: SignUpModel, thunkAPI) => {
    try {
      return await SignUpAsync(data);
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

export const verifyCode = createAsyncThunk(
  'auth/verifycode',
  async (data: CodeVerificationModel, thunkAPI) => {
    try {
      return await VerifyCodeAsync(data);
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
