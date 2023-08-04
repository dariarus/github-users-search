import {createSlice} from '@reduxjs/toolkit';
import {IRadioButtons} from '../types/store-slices';
import {IRadioButtonsActions} from '../types/actions';

export const radioButtonsSlice = createSlice({
  name: 'radioButtons',
  initialState: {
    ascendingSearchIsChecked: false,
    descendingSearchIsChecked: false,
    unsortedSearchIsChecked: true
  } as IRadioButtons,
  reducers: {
    setAscendingSearchIsChecked: (state) => {
      return {
        ...state,
        ascendingSearchIsChecked: true,
        descendingSearchIsChecked: false,
        unsortedSearchIsChecked: false
      }
    },
    setDescendingSearchIsChecked: (state) => {
      return {
        ...state,
        ascendingSearchIsChecked: false,
        descendingSearchIsChecked: true,
        unsortedSearchIsChecked: false
      }
    },
    setUnsortedSearchIsChecked: (state) => {
      return {
        ...state,
        ascendingSearchIsChecked: false,
        descendingSearchIsChecked: false,
        unsortedSearchIsChecked: true
      }
    },
  }
})

export default radioButtonsSlice.reducer

const {
  setAscendingSearchIsChecked,
  setDescendingSearchIsChecked,
  setUnsortedSearchIsChecked,
} = radioButtonsSlice.actions

export const radioButtonsActions: IRadioButtonsActions = {
  setAscendingSearchIsChecked: setAscendingSearchIsChecked,
  setDescendingSearchIsChecked: setDescendingSearchIsChecked,
  setUnsortedSearchIsChecked: setUnsortedSearchIsChecked
}