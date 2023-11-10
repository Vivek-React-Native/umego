import {API_BASE_URL} from '../../Constants/api';
import {
  CodeVerificationModel,
  LoginModel,
  SignUpModel,
} from '../../Models/AuthModels';
import axios from 'axios';
const AUTH_ENDPOINTS = API_BASE_URL + '/auth';

export const SignInAsync = async (data: LoginModel) => {
  let response: any;
  try {
    response = await axios.post(AUTH_ENDPOINTS + '/login/', data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const SignUpAsync = async (data: SignUpModel) => {
  let response;
  try {
    response = await axios.post(AUTH_ENDPOINTS + '/sign-up/', data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const VerifyCodeAsync = async (data: CodeVerificationModel) => {
  let response;
  try {
    response = await axios.post(AUTH_ENDPOINTS + '/verify-otp/', data);
    return response.data;
  } catch (error) {
    return error;
  }
};
