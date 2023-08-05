import {combineReducers} from 'redux';

import {usersListSlice} from './users-list';
import {userReposCountSlice} from './repo-count';
import {paginationSlice} from './pagination';
import {searchValueSlice} from './search-value';
import {popupSlice} from './popup';

export const rootReducer = combineReducers({
  usersListState: usersListSlice.reducer,
  userReposCountState: userReposCountSlice.reducer,
  paginationState: paginationSlice.reducer,
  searchValueState: searchValueSlice.reducer,
  popupState: popupSlice.reducer,
})