import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TErrorState} from '../types/props';
import {IPaginationActions, ISearchValueActions} from '../types/actions';
import {ISearchValue} from '../types/state-slices';

export const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: {
    searchValue: ''
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
    }
  }
})

export default searchValueSlice.reducer

export const {
  setSearchValue,
  clearSearchValueState
} = searchValueSlice.actions

export const searchValueActions: ISearchValueActions = {
  setSearchValue: setSearchValue,
  clearSearchValueState: clearSearchValueState,
}