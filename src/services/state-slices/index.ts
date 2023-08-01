import {combineReducers} from 'redux';

import {usersListSlice} from './users-list';
import {userReposCountSlice} from './repo-count';

export const rootReducer = combineReducers({
  usersListState: usersListSlice.reducer,
  userReposCountState: userReposCountSlice.reducer,
})