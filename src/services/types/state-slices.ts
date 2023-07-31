import {TErrorState, TUsersList} from './props';

export interface IUsersListSliceState {
  isLoading: boolean,
  hasError: boolean,
  error: TErrorState,
  totalResults: number,
  usersList: ReadonlyArray<TUsersList>
}