import {API_BASE_URL} from '../../Constants/api';
import {
    ReportUserModel
} from '../../Models/UserModels';
import axios from 'axios';
const USER_ENDPOINTS = API_BASE_URL + '/user';

export const ReportUserModelAsync = async (token='',data: ReportUserModel) => {
  let response;
  try {
    response = await axios.post(USER_ENDPOINTS + '/report-user/', data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

