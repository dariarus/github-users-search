export type TButton = {
  buttonName: string,
  buttonType: string,
  onClick?: () => void
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
  profileUrl: string,
  onClickCard: () => void
}

export type TPopup = {
  onClosePopup: () => void,
  login: string,
  profileUrl: string,
  username: string | null,
  userInfo: string | null,
  followers: number,
  following: number
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