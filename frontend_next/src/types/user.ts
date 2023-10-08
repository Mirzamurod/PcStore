export type UserDataType = {
  fullname: string
  username: string
  isAdmin?: string
  dark_mode: boolean
  email: string
}

export interface IUserStore {
  isLoading: boolean
  user: UserDataType | string
  isError: boolean
  code: string | boolean
  err_msg: string
  dark_mode: boolean
  deleteCode: string | boolean
}

export interface IRegister {
  isLoading: boolean
  isError: boolean
  code: string | number
  err_msg: string
}
