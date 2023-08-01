import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState, TUsersList} from './props';

export interface IUsersListActions {
  getUsersListSuccess: ActionCreatorWithPayload<{ total_count: number, items: ReadonlyArray<TUsersList> }>,
  getUsersList: ActionCreatorWithoutPayload<string>,
  getUsersListFailed: ActionCreatorWithPayload<TErrorState>
}

export interface IUserReposCountActions {
  getUserReposCountInit: ActionCreatorWithPayload<Array<string>>,
  getUserReposCountSuccess: ActionCreatorWithPayload<{login: string, total_count:number}>,
  getUserReposCount: ActionCreatorWithoutPayload<string>,
  getUserReposCountFailed: ActionCreatorWithPayload<TErrorState>
}

type TUsersListActions = IUsersListActions

type TUserReposCountActions = IUserReposCountActions

export type TApplicationActions =
  TUsersListActions
  | TUserReposCountActions