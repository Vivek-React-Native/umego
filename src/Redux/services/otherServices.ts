import {API_BASE_URL} from '../../Constants/api';
import axios from 'axios';
import {CreateTaskModel} from '../../Models/TaskModels';
import {
  CreateOrUpdateBankDetailsModel,
  UpdateProfileModel,
} from '../../Models/UserModels';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetCategoriesAsync = async (token: string) => {
  const lng = await AsyncStorage.getItem('lng');
  let response;
  try {
    response = await axios.get(API_BASE_URL + '/task/get-categories/', {
      headers: {
        Authorization: 'Bearer ' + token,
        lang: lng == 'en' ? 'en' : 'ar',
      },
    });
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

export const GetSubCategoriesAsync = async (
  mainCategoryId: number,
  token: string,
) => {
  const lng = await AsyncStorage.getItem('lng');
  let response;
  try {
    response = await axios.get(
      `${API_BASE_URL}/task/get-sub-categories/${mainCategoryId}/`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          lang: lng == 'en' ? 'en' : 'ar',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

export const CreateTaskAsync = async (data: CreateTaskModel, token: string) => {
  let response;
  try {
    response = await axios.post(`${API_BASE_URL}/task/create-task/`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

export const GetProfileInfoAsync = async (token: string) => {
  let response;
  try {
    response = await axios.get(
      `${API_BASE_URL}/user/get-user-details-by-token/`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

export const UpdateProfileAsync = async (
  data: UpdateProfileModel,
  token: string,
) => {
  let response;
  try {
    response = await axios.put(
      `${API_BASE_URL}/user/update-user-details/`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

export const GetOpenTaskListAsync = async (token: string) => {
  let response;
  try {
    response = await axios.get(`${API_BASE_URL}/task/get-open-task-list/`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

export const CreateOrUpdateBankDetailsAsync = async (
  data: CreateOrUpdateBankDetailsModel,
  token: string,
) => {
  let response;
  try {
    response = await axios.post(
      `${API_BASE_URL}/user/create-update-bank-details/`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

export const UploadMediaAsync = async (data: any, token: string) => {
  let response;
  try {
    response = await axios({
      method: 'post',
      url: `${API_BASE_URL}/upload/media/`,
      data: data,
    });
    return response;
  } catch (err) {
    return err;
  }
};
