import { UserDataType } from "../user"

export type TUserStore = {
  isLoading: boolean
  users: null | UserDataType[]
  isError: boolean
  err_msg: string
}