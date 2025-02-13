import {TErrorState} from './props';
import {TUsersListData} from './response-data';

export interface IUsersListSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  totalResults: number | null,
  usersList: ReadonlyArray<TUsersListData>,
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
  searchValue: string,
  order: string,
}

export interface IPopup {
  isOpen: boolean,
  type: "default" | "error",
  login?: string,
  profileUrl?: string,
  username?: string | null,
  userInfo?: string | null,
  reposCount?: number,
  followers?: number,
  following?: number
}
