import {TErrorState, TUsersList} from './props';

export interface IUsersListSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  totalResults: number,
  usersList: ReadonlyArray<TUsersList>
}

export interface IUserReposCount {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  // reposCount: Map<string, number>
  reposCount: { [login: string]: number }
}