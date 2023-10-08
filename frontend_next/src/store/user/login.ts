import { createSlice } from '@reduxjs/toolkit'
import { encode } from 'js-base64'
import { pcStore, loginUser, userdelete, userprofile, userupdate } from '@/store/apis'
import { IUserStore } from '@/types/user'

const initialState: IUserStore = {
  isLoading: false,
  user: '',
  isError: false,
  code: '',
  err_msg: '',
  dark_mode: true,
  deleteCode: '',
}

const login = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onStart: state => {
      state.isLoading = true
      state.isError = false
    },
    onSuccess: (state, { payload }) => {
      localStorage.setItem('token', encode(payload?.data?.token))
      state.isLoading = false
      state.isError = false
      state.code = payload.code
    },
    userProfile: (state, { payload }) => {
      state.isLoading = false
      state.isError = false
      state.user = payload.data
      state.dark_mode = payload.data.dark_mode
      state.err_msg = payload.message
      state.code = ''
    },
    userUpdate: (state, { payload }) => {
      state.isLoading = false
      state.isError = false
      state.code = payload.message.code
    },
    userDelete: (state, { payload }) => {
      state.isLoading = false
      state.isError = false
      state.deleteCode = payload.code
    },
    onFail: (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.err_msg = { ...payload?.response?.data?.message }
    },
    changeMode: state => {
      state.dark_mode = !state.dark_mode
    },
  },
})

export const userLogin = (data: any) =>
  pcStore({
    url: loginUser,
    method: 'post',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.onSuccess.type,
    onFail: login.actions.onFail.type,
  })

export const userProfile = () =>
  pcStore({
    url: userprofile,
    method: 'get',
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userProfile.type,
    onFail: login.actions.onFail.type,
  })

export const userUpdate = (data: any) =>
  pcStore({
    url: userupdate,
    method: 'put',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userUpdate.type,
    onFail: login.actions.onFail.type,
  })

export const userDelete = (data: any) =>
  pcStore({
    url: userdelete,
    method: 'post',
    data,
    onStart: login.actions.onStart.type,
    onSuccess: login.actions.userUpdate.type,
    onFail: login.actions.onFail.type,
  })

export const { changeMode } = login.actions

export default login.reducer
