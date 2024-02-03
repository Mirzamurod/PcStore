import { createSlice } from '@reduxjs/toolkit'
import { getUsersApi, pcStore } from '@/store/apis'
import { TUserStore } from '@/types/admin/user'

const initialState: TUserStore = {
  isLoading: false,
  users: null,
  isError: false,
  err_msg: '',
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    onStart: state => {
      state.isLoading = true
      state.isError = false
    },
    onGetUsers: (state, { payload }) => {
      state.isLoading = false
      state.users = payload.data
      state.isError = false
    },
    onFail: (state, { payload }) => {
      state.isLoading = false
      state.err_msg = payload.data
      state.isError = true
    },
  },
})

export const getUsers = () =>
  pcStore({
    url: getUsersApi,
    method: 'get',
    onStart: users.actions.onStart.type,
    onSuccess: users.actions.onGetUsers.type,
    onFail: users.actions.onFail.type,
  })

export default users.reducer
