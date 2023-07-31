import {AppDispatch, AppThunk} from '../types';
import {usersListActions} from '../state-slices/users-list';
// import {gitHubRestApiSearchUrl} from '../../utils/constants';
import {getResponseData} from './api';
import {TUsersList} from '../types/props';

export const getUsersList = (login: string):AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(usersListActions.getUsersList());

    fetch(`https://api.github.com/search/users?q=${login}+in:login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json'
      }
    })
      .then((res) => {
        console.log(res)
        return getResponseData<{ total_count: number, items: ReadonlyArray<TUsersList> }>(res)
      })
      .then((res) => {
          dispatch(usersListActions.getUsersListSuccess(res));
        }
      )
      .catch((err) => console.log(err));
  }
}