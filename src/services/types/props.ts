export type TButton = {
  buttonName: string,
  onClick?: () => void
}

export enum ButtonName {
  SEARCH = 'Искать',
  MORE = 'Показать еще'
}

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