import {TErrorState, TUsersList} from './props';

export interface IUsersListSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  searchingValue: string,
  totalResults: number,
  usersList: ReadonlyArray<TUsersList>
}

export interface IUserReposCount {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  reposCount: { [login: string]: number }
}

export interface IPagination {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  totalResults: number,
  currentPage: number,
  nextSelectedPage: number
}

export interface ISearchValue {
  searchValue: string
}