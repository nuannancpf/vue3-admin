export interface IUserInfo {
      name?: string
      age?: number
}

export interface ILoginInfo {
      logo_info?: IUserInfo
      slide?: string[]
      login_logo?: string
      logo_rectangle?: string
      logo_square?: string
      token: string
}
