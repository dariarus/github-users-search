import {createSlice} from '@reduxjs/toolkit';
import {IRadioButtons} from '../types/store-slices';
import {IRadioButtonsActions} from '../types/actions';
import {SearchOptions} from '../types/props';

const getInitialState = (): IRadioButtons => {
  return {
    searchOption: SearchOptions.UNSORTED
  }
}

export const radioButtonsSlice = createSlice({
  name: 'radioButtons',
  initialState: getInitialState(),
  reducers: {
    cleanState: () => {
      return getInitialState();
    }
  }
})

export default radioButtonsSlice.reducer

const {
  cleanState
} = radioButtonsSlice.actions

export const radioButtonsActions: IRadioButtonsActions = {
  cleanState: cleanState,
}