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