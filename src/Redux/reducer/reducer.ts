import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {signin, signUp, verifyCode} from '../actions/authActions';
import {reportUser} from '../actions/userActions';
import {
  paginationList,
  sendMessage,
  chatConversationList,
} from '../actions/chatActions';
import {
  getTaskById,
  cancelHireRequest,
  updateHireRequestStatus,
  coordinateTask,
  hireRequest,
  getAllMyTask,
  getTaskHistory,
  rateTask,
  updateCoordinateTaskRequestStatus,
  sendPayment,
  getAppliedUserByTaskID,
  getAppliedTaskList,
  getOpenTaskList,
  reportTask,
  getPaymentHistory,
} from '../actions/taskAction';
import {getAppliedByUserTask} from '../actions/requestActions';
import {
  uploadMedia,
  createOrUpdateBankDetails,
  getProfileInfo,
  getCategories,
  getSubCategories,
  createTask,
  updateProfile,
  getOpenTaskList_Sefa,
} from '../actions/otherActions';
import RNRestart from 'react-native-restart';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../Constants/RootStackParamList';

type InitialStateTypes = {
  isAuthenticated: boolean;
  isFetching: boolean;
  token: null | string;
  user: null | object;
  isFetchingUser: boolean;
  profileInfo: null | any;
  message: null | string;
  error: boolean;
  isSendingMessage: boolean;
  isFetchingTask: boolean;
  isFetchingRequest?: boolean;
  appliedUserRequestList?: null | Array<any>;
  isLoading: boolean;
  isFetchingChat: boolean;
  task: null | object;
  taskList: null | Array<any>;
  allTaskList: null | [];
  appliedTaskList: null | [];
  taskHistory: null | object;
  conversationList: null | Array<any>;
  isFetchingCategories: boolean;
  isFetchingSubCategories: boolean;
  categories: [];
  subCategories: [];
  success: boolean;
  chatList: null | Array<any>;
  appliedUsers: null | any;
  paymentHistory: null | any;
};

const initialState: InitialStateTypes = {
  isAuthenticated: false,
  isFetching: false,
  token: null,
  user: null,
  isLoading: false,
  profileInfo: null,
  isSendingMessage: false,
  isFetchingUser: false,
  message: null,
  error: false,
  isFetchingTask: false,
  isFetchingChat: true,
  task: null,
  taskList: [],
  allTaskList: [],
  appliedTaskList: [],
  taskHistory: null,
  conversationList: [],
  isFetchingCategories: true,
  isFetchingSubCategories: false,
  categories: [],
  subCategories: [],
  success: false,
  chatList: null,
  appliedUsers: null,
  paymentHistory: null,
};
export const reducer = createSlice({
  name: 'global',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: state => {
      AsyncStorage.removeItem('auth_token');
      state.isAuthenticated = false;
      RNRestart.Restart();
    },
    clearStates: state => {
      state.message = '';
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      // *********** SIGN IN START *********** \\
      .addCase(signin.pending, state => {
        state.isFetchingUser = true;
      })
      .addCase(signin.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.success = true;
          state.error = false;
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingUser = false;
      })
      .addCase(signin.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingUser = false;
        state.message = action.payload?.message
          ? action.payload?.message
          : 'something went wrong!';
        // *********** SIGN IN END *********** \\
      })
      // *********** SIGN UP START *********** \\
      .addCase(signUp.pending, state => {
        state.isFetchingUser = true;
      })
      .addCase(signUp.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
          state.error = false;
          state.success = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingUser = false;
      })
      .addCase(signUp.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingUser = false;
        // *********** SIGN UP END *********** \\
      })
      // *********** VERIFY CODE START *********** \\
      .addCase(verifyCode.pending, state => {
        state.isFetchingUser = true;
      })
      .addCase(verifyCode.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          AsyncStorage.setItem('auth_token', action.payload.token);
          // state.user = action.payload.data;
          state.token = action.payload.token;
          state.error = false;
          state.isAuthenticated = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingUser = false;
      })
      .addCase(verifyCode.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingUser = false;
        // *********** VERIFY CODE END *********** \\
      })
      // ***************** GET TASK BY ID START ************************//
      .addCase(getTaskById.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(getTaskById.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.task = action.payload.data;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(getTaskById.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** GET TASK BY ID END *********** \\
      })
      // ***************** CANCEL HIRE REQUEST START ************************//
      .addCase(cancelHireRequest.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(cancelHireRequest.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(cancelHireRequest.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** CANCEL HIRE REQUEST END *********** \\
      })
      // ***************** UPDATE HIRE REQUEST STATUS START ************************//
      .addCase(updateHireRequestStatus.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(updateHireRequestStatus.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(updateHireRequestStatus.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** UPDATE HIRE REQUEST END *********** \\
      })
      // ***************** COORDINATE TASK START ************************//
      .addCase(coordinateTask.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(coordinateTask.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
          state.success = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(coordinateTask.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** COORDINATE TASK END *********** \\
      })
      // ***************** HIRE REQUEST START ************************//
      .addCase(hireRequest.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(hireRequest.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(hireRequest.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** HIRE REQUEST END *********** \\
      })

      // *********** CHAT CONVERSATION LIST START *********** \\
      .addCase(chatConversationList.pending, state => {
        state.isFetchingChat = true;
      })
      .addCase(chatConversationList.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.conversationList = action.payload.data;
          state.success = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingChat = false;
      })
      .addCase(chatConversationList.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingChat = false;
        // *********** CHAT CONVERSATION LIST END *********** \\
      })
      // ***************** GET APPLIED USER BY TASK ID ************************//
      .addCase(getAppliedUserByTaskID.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(getAppliedUserByTaskID.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.appliedTaskList = action.payload.data;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(getAppliedUserByTaskID.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** GET APPLIED USER BY TASK ID END *********** \\
      })
      //*mm
      // ***************** GET APPLIED USER BY TASK ID ************************//
      .addCase(getAppliedTaskList.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(getAppliedTaskList.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.appliedTaskList = action.payload.data;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(getAppliedTaskList.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** GET APPLIED USER BY TASK ID END *********** \\
      })
      //*mm

      // ***************** GET OPEN TASK LIST START ************************//
      .addCase(getOpenTaskList.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(getOpenTaskList.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.taskList = action.payload.data;
          state.isFetchingTask = false;
        }
      })
      .addCase(getOpenTaskList.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** GET OPEN TASK LIST END *********** \\
      })
      .addCase(getOpenTaskList_Sefa.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(getOpenTaskList_Sefa.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.taskList = action.payload.data;
          state.isFetchingTask = false;
        }
      })
      .addCase(getOpenTaskList_Sefa.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** GET OPEN TASK LIST END *********** getOpenTaskList_Sefa\\
      })
      // ***************** REPORT USER START ************************//
      .addCase(reportUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(reportUser.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(reportUser.rejected, (state, action: any) => {
        state.error = true;
        state.isLoading = false;
        // *********** REPORT USER END *********** \\
      })
      // ***************** Report Task  ************************//
      .addCase(reportTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(reportTask.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.success = true;
        } else {
          (state.error = true), (state.message = action.playload.message);
        }
        state.isLoading = false;
      })
      .addCase(reportTask.rejected, (state, action: any) => {
        state.error = true;
        state.isLoading = false;
        // *********** Report Task End*********** \\
      })
      // ***************** GET ALL MY TASK START ************************//
      .addCase(getAllMyTask.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(getAllMyTask.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.allTaskList = action.payload.data;
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(getAllMyTask.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** REPORT USER END *********** \\
      })

      .addCase(getAppliedByUserTask.pending, state => {
        state.isFetchingRequest = true;
      })
      .addCase(getAppliedByUserTask.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.appliedUserRequestList = action.payload.data;
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingRequest = false;
      })
      .addCase(getAppliedByUserTask.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingRequest = false;
        // *********** REPORT USER END *********** \\
      })
      // ***************** SEND PAYMENT START  ************************//
      .addCase(sendPayment.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(sendPayment.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.task = action.payload.data;
        }
      })
      .addCase(sendPayment.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** SEND PAYMENT End*********** \\
      })

      // ***************** GET TASK HISTORY START ************************//
      .addCase(getTaskHistory.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(getTaskHistory.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.taskHistory = action.payload.data;
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(getTaskHistory.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** GET TASK HISTORY END *********** \\
      })

      // *********** GET PAYMENT HISTORY START *********** \\

      .addCase(getPaymentHistory.pending, (state, action) => {
        state.isFetchingTask = true;
      })
      .addCase(getPaymentHistory.fulfilled, (state, action) => {
        state.isFetchingTask = false;
        state.paymentHistory = action.payload;
      })
      .addCase(getPaymentHistory.rejected, (state, action) => {
        state.error = true;
        state.isFetchingTask = false;
      })
      // *********** GET PAYMENT HISTORY END *********** \\

      // ***************** updateCoordinateTaskRequestStatus START  ************************//
      .addCase(updateCoordinateTaskRequestStatus.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(
        updateCoordinateTaskRequestStatus.fulfilled,
        (state, action: any) => {
          if (action.payload?.status || action.payload?.code === 200) {
            state.task = action.payload.data;
            state.success = true;
          } else {
            state.message = action.payload.message;
            state.error = true;
          }
          state.isFetchingTask = false;
        },
      )
      .addCase(
        updateCoordinateTaskRequestStatus.rejected,
        (state, action: any) => {
          state.error = true;
          state.isFetchingTask = false;
          // *********** updateCoordinateTaskRequestStatus End  *********** \\
        },
      )
      // ***************** CHAT PAGINATION LIST START ************************//
      .addCase(paginationList.pending, state => {
        state.isFetchingChat = true;
      })
      .addCase(paginationList.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.chatList = action.payload.data;
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingChat = false;
      })
      .addCase(paginationList.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingChat = false;
        // *********** CHAT PAGINATION LIST END *********** \\
      })

      // ***************** SEND MESSAGE START ************************//

      .addCase(sendMessage.pending, state => {
        state.isSendingMessage = true;
      })
      .addCase(sendMessage.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isSendingMessage = false;
      })
      .addCase(sendMessage.rejected, (state, action: any) => {
        state.error = true;
        state.isSendingMessage = false;
        // *********** SEND MESSAGE END *********** \\
      })
      // ***************** RATE TASK START ************************//
      .addCase(rateTask.pending, state => {
        state.isLoading = true;
      })
      .addCase(rateTask.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isLoading = false;
      })
      .addCase(rateTask.rejected, (state, action: any) => {
        state.error = true;
        state.isLoading = false;
        // *********** RATE TASK END *********** \\
      })
      // ***************** UPLOAD MEDIA START ************************//
      .addCase(uploadMedia.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadMedia.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isLoading = false;
      })
      .addCase(uploadMedia.rejected, (state, action: any) => {
        state.error = true;
        state.isLoading = false;
        // *********** UPLOAD MEDIA END *********** \\
      })
      // ***************** CREATE OR UPDATE BANK DETAILS START ************************//
      .addCase(createOrUpdateBankDetails.pending, state => {
        state.isLoading = true;
      })
      .addCase(createOrUpdateBankDetails.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = action.payload.message;
          state.success = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isLoading = false;
      })
      .addCase(createOrUpdateBankDetails.rejected, (state, action: any) => {
        state.error = true;
        state.isLoading = false;
        state.success = true;
        // *********** CREATE OR UPDATE BANK DETAILS END *********** \\
      })
      // ***************** GET PROFILE DATA START ************************//
      .addCase(getProfileInfo.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProfileInfo.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.profileInfo = action.payload.data;
          state.message = '';
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isLoading = false;
      })
      .addCase(getProfileInfo.rejected, (state, action: any) => {
        state.error = true;
        state.isLoading = false;
        // *********** GET PROFILE DATA END *********** \\
      })
      // ***************** GET CATEGORIES START ************************//
      .addCase(getCategories.pending, state => {
        state.isFetchingCategories = true;
      })
      .addCase(getCategories.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.message = '';
          state.categories = action.payload.data;
          // state.success = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingCategories = false;
      })
      .addCase(getCategories.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingCategories = false;
        // *********** GET CATEGORIES END *********** \\
      }) // ***************** GET sub CATEGORIES START ************************//
      .addCase(getSubCategories.pending, state => {
        state.isFetchingSubCategories = true;
      })
      .addCase(getSubCategories.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.subCategories = action.payload.data;
          state.success = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingSubCategories = false;
      })
      .addCase(getSubCategories.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingSubCategories = false;
        // *********** GET sub CATEGORIES END *********** \\
      })
      // ***************** CREATE TASK START ************************//
      .addCase(createTask.pending, state => {
        state.isFetchingTask = true;
      })
      .addCase(createTask.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          state.success = true;
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isFetchingTask = false;
      })
      .addCase(createTask.rejected, (state, action: any) => {
        state.error = true;
        state.isFetchingTask = false;
        // *********** CREATE TASK END *********** createTask\\
      })
      // ***************** UPDATE PROFILE START ************************//
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action: any) => {
        if (action.payload?.status || action.payload?.code === 200) {
          // state.profileInfo = action.payload.data;
          state.success = true;
        } else {
          state.message = action.payload.message;
          state.error = true;
        }
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action: any) => {
        state.error = true;
        state.isLoading = false;
        // *********** UPDATE PROFILE END *********** createTask\\
      });
  },
});
export const {authenticateUser, logout, clearStates} = reducer.actions;

export default reducer.reducer;
