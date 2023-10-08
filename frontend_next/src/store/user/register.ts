import { createSlice } from '@reduxjs/toolkit'
import { pcStore, registerUser } from '@/store/apis'
import { IRegister } from '@/types/user'

const initialState: IRegister = { isLoading: false, isError: false, code: '', err_msg: '' }

const register = createSlice({
  name: 'register',
  initialState,
  reducers: {
    onStart: state => {
      state.isLoading = true
      state.isError = false
    },
    onSuccess: (state, { payload }) => {
      console.log(payload)
      state.isLoading = false
    },
    onFail: (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.err_msg = { ...payload.response.data.message }
    },
  },
})

export const addUser = (data: any) =>
  pcStore({
    url: registerUser,
    method: 'post',
    data,
    onStart: register.actions.onStart.type,
    onSuccess: register.actions.onSuccess.type,
    onFail: register.actions.onFail.type,
  })

export default register.reducer
