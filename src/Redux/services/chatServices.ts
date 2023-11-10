import {API_BASE_URL} from '../../Constants/api';
import {ChatModel} from '../../Models/ChatModels';
import axios from 'axios';
import {PaginationListModel, SendMessageModel} from '../../Models/ChatModels';

const CHAT_ENDPOINTS = API_BASE_URL + '/message';

export const ChatConversationListAsync = async (
  data: ChatModel,
  token: string,
) => {
  let response;
  try {
    response = await axios.post(
      CHAT_ENDPOINTS + `/conversation-pagination-list/${1}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('error: ', error);

    return error;
  }
};

export const ChatPaginationAsync = async (
  data: PaginationListModel,
  token: string,
) => {
  let response;
  try {
    response = await axios.post(
      CHAT_ENDPOINTS + '/inobx-pagination-listing/',
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

export const SendMessageAsync = async (
  data: SendMessageModel,
  token: string,
) => {
  let response;
  try {
    response = await axios.post(CHAT_ENDPOINTS + '/send-message/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};
