import {getResponseData} from './json-verification';

import {usersListActions} from '../store-slices/users-list';
import {paginationActions} from '../store-slices/pagination';
import {popupActions} from '../store-slices/popup';

import {gitHubRestApiSearchUrl, gitHubRestApiUrl, itemsCountPerPage} from '../../utils/constants';

import {AppDispatch, AppThunk} from '../types';
import {TPopupData, TUsersListData} from '../types/response-data';

export const getUsersList = (login: string, pageNumber: number): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(usersListActions.getUsersList());

    return fetch(`${gitHubRestApiSearchUrl}/users?q=${login}+in:login&per_page=${itemsCountPerPage}&page=${pageNumber}`, {
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
        dispatch(paginationActions.getDataPerPageSuccess({total_count: res.total_count, currentPage: pageNumber}))
        // Возвращаем результат для тестирования
        return res;
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

    return fetch(`${gitHubRestApiSearchUrl}/users?q=${login}+in:login&sort=repositories&order=${order}&per_page=${itemsCountPerPage}&page=${pageNumber}`, {
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
        dispatch(paginationActions.getDataPerPageSuccess({total_count: res.total_count, currentPage: pageNumber}));
        return res;
      })
      .catch((err) => {
        console.log(err.message)
        dispatch(usersListActions.getUsersListFailed({message: err.message}))
      });
  }
}

export const getPopupUserData = (login: string): AppThunk => {
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
        dispatch(popupActions.getPopupDataSuccess(res));
        return res;
      })
      .catch((err) =>  {
        console.log(err.message);
        dispatch(popupActions.getPopupDataFailed({message: err.message}));
      });
  }
}

