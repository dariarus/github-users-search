import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TErrorState, TUsersList} from './props';

export interface IUsersListActions {
  getUsersListSuccess: ActionCreatorWithPayload<ReadonlyArray<TUsersList>>,
  getUsersList: ActionCreatorWithoutPayload<string>,
  getUsersListFailed: ActionCreatorWithPayload<TErrorState>
}

type TUsersListActions = IUsersListActions

export type TApplicationActions =
  TUsersListActions