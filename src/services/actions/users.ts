import {AppDispatch, AppThunk} from '../types';
import {usersListActions} from '../state-slices/users-list';
import {gitHubRestApiSearchUrl} from '../../utils/constants';
import {getResponseData} from './api';
import {TUsersList} from '../types/props';
import {userReposCountActions, userReposCountSlice} from '../state-slices/repo-count';

export const getUserReposCount = (login: string) => {
  return function (dispatch: AppDispatch) {

    dispatch(userReposCountActions.getUserReposCount());

    return fetch(`${gitHubRestApiSearchUrl}/repositories?q=user:${login}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer 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'
      }
    })
      .then((res) => {
        return getResponseData<{ total_count: number }>(res)
      })
      .then((res) => {
        dispatch(userReposCountActions.getUserReposCountSuccess({login: login, total_count: res.total_count}))
      })
      .catch((err) =>  {
        console.log(err.message);
        dispatch(userReposCountActions.getUserReposCountSuccess({login: login, total_count: 0}))
        dispatch(userReposCountActions.getUserReposCountFailed({message: err.message}));
      });
  }
}

export const getUsersList = (login: string): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(usersListActions.getUsersList());

    fetch(`${gitHubRestApiSearchUrl}/users?q=${login}+in:login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer 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'
      }
    })
      .then((res) => {
        return getResponseData<{ total_count: number, items: ReadonlyArray<TUsersList> }>(res)
      })
      .then((res) => {
        dispatch(usersListActions.getUsersListSuccess(res));
        const logins = res.items.map(item => item.login);
        logins.forEach((login) => {
          return dispatch(getUserReposCount(login))
        })
      })
      .catch((err) => {
        console.log(err.message)
        dispatch(usersListActions.getUsersListFailed({message: err.message}))
      });
  }
}

