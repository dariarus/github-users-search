import {TErrorState} from './props';
import {TUsersListData} from './response-data';

export interface IUsersListSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  searchingValue: string,
  totalResults: number,
  usersList: ReadonlyArray<TUsersListData>
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

export interface IPopup {
  isOpen: boolean,
  login: string,
  profileUrl: string,
  username: string | null,
  userInfo: string | null,
  followers: number,
  following: number
}