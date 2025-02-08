import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {SearchOptions, TErrorState} from './props';
import {TPopupData, TUsersListData} from './response-data';

export interface IUsersListActions {
  getUsersListSuccess: ActionCreatorWithPayload<{ total_count: number, items: ReadonlyArray<TUsersListData> }>,
  getUsersList: ActionCreatorWithoutPayload<string>,
  getUsersListFailed: ActionCreatorWithPayload<TErrorState>
}

export interface IUserReposCountActions {
  getUserReposCountSuccess: ActionCreatorWithPayload<{ login: string, total_count: number }>,
  getUserReposCount: ActionCreatorWithoutPayload<string>,
  getUserReposCountFailed: ActionCreatorWithPayload<TErrorState>
}

export interface IPaginationActions {
  getDataPerPageSuccess: ActionCreatorWithPayload<{ total_count: number, currentPage: number }>,
  getDataPerPage: ActionCreatorWithoutPayload<string>,
  getDataPerPageFailed: ActionCreatorWithPayload<TErrorState>,
}

export interface ISearchValueActions {
  setSearchValue: ActionCreatorWithPayload<string>,
  clearSearchValueState: ActionCreatorWithoutPayload<string>,
  setOrderState: ActionCreatorWithPayload<string>,
}

export interface IPopupActions {
  getPopupDataSuccess: ActionCreatorWithPayload<TPopupData>,
  getPopupData: ActionCreatorWithoutPayload<string>,
  getPopupDataFailed: ActionCreatorWithPayload<TErrorState>,
  onOpenPopup: ActionCreatorWithPayload<"default" | "error">,
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