export type TUsersListData = {
  login: string,
  avatar_url: string,
  html_url: string
}

export type TPopupData = {
  login: string,
  html_url: string,
  name: string | null,
  bio: string | null,
  followers: number,
  following: number
}