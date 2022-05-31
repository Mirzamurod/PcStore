import { createSlice } from '@reduxjs/toolkit'
import { encode } from 'js-base64'
import { apiPcStore, loginUser, userdelete, userprofile, userupdate } from '../api'

const login = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        user: '',
        isError: false,
        code: '',
        err_msg: '',
        dark_mode: true,
        deleteCode: '',
    },
    reducers: {
        onStart: state => {
            state.isLoading = true
            state.isError = false
        },
        onSuccess: (state, { payload }) => {
            localStorage.setItem('token', encode(payload.data.token))
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
            state.err_msg = { ...payload.response.data.message }
        },
        changeMode: state => {
            state.dark_mode = !state.dark_mode
        },
    },
})

export const userLogin = data =>
    apiPcStore({
        url: loginUser,
        method: 'post',
        data,
        onStart: login.actions.onStart.type,
        onSuccess: login.actions.onSuccess.type,
        onFail: login.actions.onFail.type,
    })

export const userProfile = () =>
    apiPcStore({
        url: userprofile,
        method: 'get',
        onStart: login.actions.onStart.type,
        onSuccess: login.actions.userProfile.type,
        onFail: login.actions.onFail.type,
    })

export const userUpdate = data =>
    apiPcStore({
        url: userupdate,
        method: 'put',
        data,
        onStart: login.actions.onStart.type,
        onSuccess: login.actions.userUpdate.type,
        onFail: login.actions.onFail.type,
    })

export const userDelete = data =>
    apiPcStore({
        url: userdelete,
        method: 'post',
        data,
        onStart: login.actions.onStart.type,
        onSuccess: login.actions.userUpdate.type,
        onFail: login.actions.onFail.type,
    })

export const { changeMode } = login.actions

export default login.reducer
