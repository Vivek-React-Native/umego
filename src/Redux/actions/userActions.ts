import { createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
    ReportUserModel
} from '../../Models/UserModels';
import {
    ReportUserModelAsync
} from '../services/userServices';
import { RootStore } from '../store/store';

export const reportUser = createAsyncThunk(
    '/report-user',
    async (data: ReportUserModel, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as RootStore;
            const token = state.global.token;
            return await ReportUserModelAsync(token,data);
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


