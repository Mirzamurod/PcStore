import { Mode } from "./themeConfig"

export type UserDataType = {
  fullname: string
  username: string
  isAdmin?: string
  mode: Mode
  email: string
  createdAt: string
  updatedAt: string
  _id: string
}

export interface IUserStore {
  isLoading: boolean
  user: UserDataType | null
  isError: boolean
  code: string | boolean
  err_msg: string
  mode: Mode
  deleteCode: string | boolean
  token: boolean
}

export interface IRegister {
  isLoading: boolean
  isError: boolean
  code: string | number
  err_msg: string
}
