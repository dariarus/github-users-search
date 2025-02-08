import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SearchOptions} from '../types/props';
import {ISearchValueActions} from '../types/actions';
import {ISearchValue} from '../types/store-slices';

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: {
    searchValue: '',
    order: SearchOptions.UNSORTED,
  } as ISearchValue,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchValue: action.payload
      }
    },
    clearSearchValueState: (state) => {
      return {
        ...state,
        searchValue: '',
      }
    },
    setOrder: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        order: action.payload
      }
    }
  }
})

export default searchValueSlice.reducer

const {
  setSearchValue,
  clearSearchValueState,
  setOrder
} = searchValueSlice.actions

export const searchValueActions: ISearchValueActions = {
  setSearchValue: setSearchValue,
  clearSearchValueState: clearSearchValueState,
  setOrderState: setOrder,
}