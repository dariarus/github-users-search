import {AppDispatch, AppThunk} from '../types';
import {usersListActions} from '../state-slices/users-list';
import {gitHubRestApiSearchUrl, itemsCountPerPage} from '../../utils/constants';
import {getResponseData} from './json-verification';
import {TUsersList} from '../types/props';
import {userReposCountActions} from '../state-slices/repo-count';
import {paginationActions} from '../state-slices/pagination';

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
        return getResponseData<{ total_count: number, items: ReadonlyArray<TUsersList> }>(res)
      })
      .then((res) => {
        dispatch(usersListActions.getUsersListSuccess(res));
        // const logins = res.items.map(item => item.login);
        // logins.forEach((login) => {
        //   return dispatch(getUserReposCount(login))
        // });
        dispatch(paginationActions.getDataPerPageSuccess({total_count: res.total_count, currentPage: pageNumber}))
      })
      .catch((err) => {
        console.log(err.message)
        dispatch(usersListActions.getUsersListFailed({message: err.message}))
      });
  }
}

