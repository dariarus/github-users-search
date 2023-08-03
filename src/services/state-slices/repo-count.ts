import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserReposCount} from '../types/store-slices';
import {TErrorState} from '../types/props';
import {IUserReposCountActions} from '../types/actions';

export const userReposCountSlice = createSlice({
  name: 'reposCount',
  initialState: {
    isLoading: false,
    hasError: false,
    error: {},
    reposCount: {},
  } as IUserReposCount,
  reducers: {
    getUserReposCountInit: (state, action: PayloadAction<Array<string>>) => {
      // if (action.payload) {
      //   action.payload.forEach((login) => getUserReposCount(login))
      // }
      // return state
    },
    getUserReposCountSuccess: (state, action: PayloadAction<{login: string, total_count:number}>) => {
      const reposCountsCopy = {...state.reposCount}
      reposCountsCopy[action.payload.login] = action.payload.total_count

      return {
        ...state,
        isLoading: false,
        hasError: false,
        reposCount: reposCountsCopy
      }
    },
    getUserReposCount: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getUserReposCountFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    }
  }
})

export default userReposCountSlice.reducer

export const {
  getUserReposCountInit,
  getUserReposCountSuccess,
  getUserReposCount,
  getUserReposCountFailed
} = userReposCountSlice.actions

export const userReposCountActions: IUserReposCountActions = {
  getUserReposCountInit: getUserReposCountInit,
  getUserReposCountSuccess: getUserReposCountSuccess,
  getUserReposCount: getUserReposCount,
  getUserReposCountFailed: getUserReposCountFailed
}
