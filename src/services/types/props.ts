export type TButton = {
  buttonName: string,
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
  repoNumber: number,
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
  avatarUrl: string,
  profileUrl: string
}