import {combineReducers} from 'redux';

import {usersListSlice} from './users-list';

export const rootReducer = combineReducers({
  usersListState: usersListSlice.reducer,
})