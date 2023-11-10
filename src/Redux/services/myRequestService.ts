import {API_BASE_URL} from '../../Constants/api';
import axios from 'axios';
const TASK_END_POINTS = API_BASE_URL + '/task';

export const getAppliedUserTaskList = async data => {
  const defaultOptions = {
    headers: {
      Authorization: data ? `Bearer ${data}` : '',
    },
  };
  let response;
  try {
    response = await axios.get(TASK_END_POINTS + '/get-applied-user/1/', {
      ...defaultOptions,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
