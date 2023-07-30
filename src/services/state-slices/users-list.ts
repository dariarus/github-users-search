import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TErrorState, TUsersList} from '../types/props';
import {IUsersListActions} from '../types/actions';
import {IUsersListSliceState} from '../types/state-slices';

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState: {
    isLoading: false,
    hasError: false,
    error: {},
    usersList: []
  } as IUsersListSliceState,
  reducers: {
    getUsersListSuccess: (state, action: PayloadAction<ReadonlyArray<TUsersList>>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        usersList: action.payload
      }
    },
    getUsersList: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getUsersListFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    }
  }
})

export default usersListSlice.reducer

export const {
  getUsersListSuccess,
  getUsersList,
  getUsersListFailed
} = usersListSlice.actions

export const usersListActions: IUsersListActions = {
  getUsersListSuccess: getUsersListSuccess,
  getUsersList: getUsersList,
  getUsersListFailed: getUsersListFailed
}
