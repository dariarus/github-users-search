export type TUsersListData = {
  login: string,
  avatar_url: string,
  html_url: string,
  type: string
}

export type TPopupData = {
  login: string,
  html_url: string,
  name: string | null,
  bio: string | null,
  public_repos: number,
  followers: number,
  following: number
}