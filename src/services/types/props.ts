import {MouseEventHandler} from 'react';

export type TButton = {
  buttonName: string,
  buttonType: string,
  onClick?: () => void
}

// export enum ButtonType {
//   SEARCH = 'search',
//   PAGINATION_PAGE = 'pagination'
// }

export type TRadioButton = {
  label: string,
  checked: boolean,
  onClickRadio: () => void
}

export type TUserCard = {
  avatarSrc: string,
  login: string,
  repoNumber: number | undefined,
  profileUrl: string
}

export type TPopup = {
  onClosePopup: () => void,
  login: string,
  profileUrl: string,
  username: string,
  userInfo: string,
  followers: number,
  following: number
}

export type TErrorState = {
  message?: string
};

export type TUsersList = {
  login: string,
  avatar_url: string,
  html_url: string
}

export type TPagination = {
  totalResults: number,
  currentPage: number,
  siblingCount: number, // сколько кнопок с номерами страниц отрисовывать справа и слева от кнопки текущей страницы
  itemsPerPage: number
}