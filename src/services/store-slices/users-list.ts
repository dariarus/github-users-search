import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TErrorState} from '../types/props';
import {IUsersListActions} from '../types/actions';
import {IUsersListSliceState} from '../types/store-slices';
import {TUsersListData} from '../types/response-data';

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState: {
    isLoading: false,
    hasError: false,
    error: {},
    totalResults: null,
    usersList: []
  } as IUsersListSliceState,
  reducers: {
    getUsersListSuccess: (state, action: PayloadAction<{total_count: number, items: ReadonlyArray<TUsersListData>}>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        totalResults: action.payload.total_count,
        usersList: action.payload.items
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

const {
  getUsersListSuccess,
  getUsersList,
  getUsersListFailed
} = usersListSlice.actions

export const usersListActions: IUsersListActions = {
  getUsersListSuccess: getUsersListSuccess,
  getUsersList: getUsersList,
  getUsersListFailed: getUsersListFailed
}
