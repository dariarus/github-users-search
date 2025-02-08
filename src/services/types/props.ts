import {ChangeEvent} from 'react';

export type TButton = {
  buttonName: string,
  isDisabled: boolean,
  onClick?: () => void
}

export type TSearchForm = {
  onCleanSearchOption: () => void
}

export type TSearchResults = {
  searchOptionValue: string,
  onChangeOptionValue: (e: ChangeEvent<HTMLInputElement>) => void
}

export type TRadioButton = {
  label: string,
  value: string,
  checked: boolean,
  onClickRadio: (event: ChangeEvent<HTMLInputElement>) => void
}

export type TUserCard = {
  avatarSrc: string,
  login: string,
  type: string,
  profileUrl: string,
  onClickCard: () => void
}

export type TPopup = {
  onClosePopup: () => void,
  type: 'default' | 'error',
  login?: string,
  profileUrl?: string,
  username?: string | null,
  userInfo?: string | null,
  reposCount?: number,
  followers?: number,
  following?: number
}

export type TErrorState = {
  message?: string
};

export type TPagination = {
  totalResults: number,
  currentPage: number,
  siblingCount: number, // сколько кнопок с номерами страниц отрисовывать справа и слева от кнопки текущей страницы
  itemsPerPage: number
}

export enum SearchOptions {
  ASCENDING = 'ascendingSearch',
  DESCENDING = 'descendingSearch',
  UNSORTED = 'unsortedSearch'
}