import {getResponseData} from './json-verification';

import {usersListActions} from '../store-slices/users-list';
import {userReposCountActions} from '../store-slices/repo-count';
import {paginationActions} from '../store-slices/pagination';
import {popupActions} from '../store-slices/popup';

import {gitHubRestApiSearchUrl, gitHubRestApiUrl, itemsCountPerPage} from '../../utils/constants';

import {AppDispatch, AppThunk} from '../types';
import {TPopupData, TUsersListData} from '../types/response-data';

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

export const getUsersList = (login: string, pageNumber: number): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(usersListActions.getUsersList());

    fetch(`${gitHubRestApiSearchUrl}/users?q=${login}+in:login&per_page=${itemsCountPerPage}&page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer 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'
      }
    })
      .then((res) => {
        return getResponseData<{ total_count: number, items: ReadonlyArray<TUsersListData> }>(res)
      })
      .then((res) => {
        dispatch(usersListActions.getUsersListSuccess(res));
        const logins = res.items.map(item => item.login);
        logins.forEach((login) => {
          return dispatch(getUserReposCount(login))
        });
        dispatch(paginationActions.getDataPerPageSuccess({total_count: res.total_count, currentPage: pageNumber}))
      })
      .catch((err) => {
        console.log(err.message)
        dispatch(usersListActions.getUsersListFailed({message: err.message}))
      });
  }
}

export const getUsersListSorted = (login: string, order: string, pageNumber: number): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(usersListActions.getUsersList());

    fetch(`${gitHubRestApiSearchUrl}/users?q=${login}+in:login&sort=repositories&order=${order}&per_page=${itemsCountPerPage}&page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer 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'
      }
    })
      .then((res) => {
        return getResponseData<{ total_count: number, items: ReadonlyArray<TUsersListData> }>(res)
      })
      .then((res) => {
        dispatch(usersListActions.getUsersListSuccess(res));
        const logins = res.items.map(item => item.login);
        logins.forEach((login) => {
          return dispatch(getUserReposCount(login))
        });
        dispatch(paginationActions.getDataPerPageSuccess({total_count: res.total_count, currentPage: pageNumber}))
      })
      .catch((err) => {
        console.log(err.message)
        dispatch(usersListActions.getUsersListFailed({message: err.message}))
      });
  }
}

export const getPopupUserData = (login: string) => {
  return function (dispatch: AppDispatch) {

    dispatch(popupActions.getPopupData());

    return fetch(`${gitHubRestApiUrl}/users/${login}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer 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'
      }
    })
      .then((res) => {
        return getResponseData<TPopupData>(res)
      })
      .then((res) => {
        dispatch(popupActions.getPopupDataSuccess(res))
      })
      .catch((err) =>  {
        console.log(err.message);
        dispatch(popupActions.getPopupDataFailed({message: err.message}));
      });
  }
}

