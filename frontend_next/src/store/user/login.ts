import { createSlice } from '@reduxjs/toolkit'
import { encode } from 'js-base64'
import { pcStore, loginUser, userdelete, userprofile, userupdate } from '@/store/apis'
import { IUserStore } from '@/types/user'

const initialState: IUserStore = {
  isLoading: false,
  user: null,
  isError: false,
  code: '',
  token: false,
  err_msg: '',
  mode: 'dark',
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
      state.token = true
      state.isLoading = false
      state.isError = false
    },
    userProfile: (state, { payload }) => {
      state.isLoading = false
      state.isError = false
      state.user = payload.data
      state.mode = payload.data.mode
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
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
    getUserData: (state, { payload }) => {
      state.user = payload
    },
    deleteUser: state => {
      state.user = null
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

export const { changeMode, getUserData, deleteUser } = login.actions

export default login.reducer
