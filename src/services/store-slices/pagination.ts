import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IPagination} from '../types/store-slices';
import {TErrorState} from '../types/props';
import {IPaginationActions} from '../types/actions';

const getInitialState = (): IPagination => {
  return {
    isLoading: false,
    hasError: false,
    error: {},
    totalResults: 0,
    currentPage: 1,
    nextSelectedPage: 0
  }
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: getInitialState(),
  reducers: {
    getDataPerPageSuccess: (state, action: PayloadAction<{total_count: number, currentPage: number}>) => {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        totalResults: action.payload.total_count,
        currentPage: action.payload.currentPage
      }
    },
    getDataPerPage: (state) => {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    },
    getDataPerPageFailed: (state, action: PayloadAction<TErrorState>) => {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    },
  }
})

export default paginationSlice.reducer

const {
  getDataPerPageSuccess,
  getDataPerPage,
  getDataPerPageFailed,
} = paginationSlice.actions

export const paginationActions: IPaginationActions = {
  getDataPerPageSuccess: getDataPerPageSuccess,
  getDataPerPage: getDataPerPage,
  getDataPerPageFailed: getDataPerPageFailed,
}