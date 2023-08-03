import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState, TUsersList} from './props';

export interface IUsersListActions {
  getUsersListSuccess: ActionCreatorWithPayload<{ total_count: number, items: ReadonlyArray<TUsersList> }>,
  getUsersList: ActionCreatorWithoutPayload<string>,
  getUsersListFailed: ActionCreatorWithPayload<TErrorState>
}

export interface IUserReposCountActions {
  getUserReposCountInit: ActionCreatorWithPayload<Array<string>>,
  getUserReposCountSuccess: ActionCreatorWithPayload<{ login: string, total_count: number }>,
  getUserReposCount: ActionCreatorWithoutPayload<string>,
  getUserReposCountFailed: ActionCreatorWithPayload<TErrorState>
}

export interface IPaginationActions {
  getDataPerPageSuccess: ActionCreatorWithPayload<{ total_count: number, currentPage: number }>,
  getDataPerPage: ActionCreatorWithoutPayload<string>,
  getDataPerPageFailed: ActionCreatorWithPayload<TErrorState>,
  cleanPagination: ActionCreatorWithoutPayload<string>
}

export interface ISearchValueActions {
  setSearchValue: ActionCreatorWithPayload<string>,
  clearSearchValueState: ActionCreatorWithoutPayload<string>
}

type TUsersListActions = IUsersListActions

type TUserReposCountActions = IUserReposCountActions

type TPaginationActions = IPaginationActions

type TSearchValueActions = ISearchValueActions

export type TApplicationActions =
  TUsersListActions
  | TUserReposCountActions
  | TPaginationActions
  | TSearchValueActions