import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState} from './props';
import {TPopupData, TUsersListData} from './response-data';

export interface IUsersListActions {
  getUsersListSuccess: ActionCreatorWithPayload<{ total_count: number, items: ReadonlyArray<TUsersListData> }>,
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

export interface IPopupActions {
  getPopupDataSuccess: ActionCreatorWithPayload<TPopupData>,
  getPopupData: ActionCreatorWithoutPayload<string>,
  getPopupDataFailed: ActionCreatorWithPayload<TErrorState>,
  onOpenPopup: ActionCreatorWithoutPayload<string>,
  onClosePopup: ActionCreatorWithoutPayload<string>,
}

export interface IRadioButtonsActions {
  cleanState: ActionCreatorWithoutPayload<string>
}

type TUsersListActions = IUsersListActions

type TUserReposCountActions = IUserReposCountActions

type TPaginationActions = IPaginationActions

type TSearchValueActions = ISearchValueActions

type TPopupActions = IPopupActions

type TRadioButtonsActions = IRadioButtonsActions

export type TApplicationActions =
  TUsersListActions
  | TUserReposCountActions
  | TPaginationActions
  | TSearchValueActions
  | TPopupActions
  | TRadioButtonsActions