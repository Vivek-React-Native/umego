import {API_BASE_URL} from '../../Constants/api';
import axios from 'axios';
import {
  CoordinateTaskModel,
  DeletionRequestModel,
  ReportTaskModel,
} from '../../Models/TaskModels';
const TASK_END_POINTS = API_BASE_URL + '/task';

export const GetTaskById = async (token = '', id) => {
  let response;
  try {
    response = await axios.get(TASK_END_POINTS + `/get-task-by-id/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const CancelHireRequest = async (token: string, id: number) => {
  let response;
  let data = {
    request_id: id,
  };
  try {
    response = await axios.put(
      TASK_END_POINTS + '/cancel-hire-request/',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const UpdateHireRequestStatus = async data => {
  let response;
  try {
    response = await axios.put(
      TASK_END_POINTS + '/update-hire-request-status/',
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const CoordinateTask = async (
  data: CoordinateTaskModel,
  token: string,
) => {
  let response;
  try {
    response = await axios.post(TASK_END_POINTS + '/coordinate_task/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const HireRequest = async (token = '', id) => {
  let response;
  let data = {
    task: id,
  };
  try {
    response = await axios.post(TASK_END_POINTS + '/hire-request/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetAppliedUserByTaskID = async (token: string, id: Number) => {
  let response;
  try {
    response = await axios.get(TASK_END_POINTS + `/get-applied-user/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};
export const GetAppliedUserList = async (token = '') => {
  let response;
  try {
    response = await axios.get(TASK_END_POINTS + '/get-my-applied-task-list/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const OpenTaskList = async token => {
  let response;
  try {
    response = await axios.get(TASK_END_POINTS + '/get-open-task-list/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const UpdateCoordinateTaskRequestStatus = async (
  data: {coordinate_status: number; taskId: number},
  token: string,
) => {
  let response;
  let senddata = {
    coordinate_status: data.coordinate_status,
  };
  try {
    response = await axios.put(
      TASK_END_POINTS + `/update_coordinate_task_status/${data.taskId}/`,
      senddata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
export const GetMyAppliedTaskList = async data => {
  const defaultOptions = {
    headers: {
      Authorization: data ? `Bearer ${data}` : '',
    },
  };
  let response;
  try {
    response = await axios.put(TASK_END_POINTS + 'get-my-applied-task-list/', {
      ...defaultOptions,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const ReportTask = async (data: ReportTaskModel, token: string) => {
  let response;
  try {
    response = await axios.post(TASK_END_POINTS + '/report-task/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const GetAllMyTask = async token => {
  let response;
  try {
    response = await axios.get(TASK_END_POINTS + '/get-all-task-by-token/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const SendPayment = async data => {
  let response;
  try {
    response = await axios.post(TASK_END_POINTS + '/send-payment/', data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetTaskHistoryAsync = async data => {
  const defaultOptions = {
    headers: {
      Authorization: data ? `Bearer ${data}` : '',
    },
  };
  let response;
  try {
    response = await axios.get(TASK_END_POINTS + '/get-task-history/', {
      ...defaultOptions,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetPaymentHistory = async data => {
  const defaultOptions = {
    headers: {
      Authorization: data ? `Bearer ${data}` : '',
    },
  };
  let response;
  try {
    response = await axios.get(API_BASE_URL + '/payment/get-payment-history/', {
      ...defaultOptions,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const RateTaskAsync = async data => {
  let response;
  try {
    response = await axios.post(TASK_END_POINTS + '/rate-task-user/', data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetAppliedUsersByTaskIdAsync = async (
  data: number,
  token: string,
) => {
  let response;
  try {
    response = await axios.get(`${TASK_END_POINTS}get-applied-user/${data}/`, {
      headers: {
        Auhtorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
