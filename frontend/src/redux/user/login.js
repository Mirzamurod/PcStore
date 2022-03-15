import { createSlice } from '@reduxjs/toolkit'
import { apiPcStore, loginUser, userprofile } from '../api'
import { encode } from 'js-base64'

const login = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        user: '',
        isError: false,
        code: '',
        err_msg: '',
        dark_mode: true,
        status: 0,
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
            state.status = payload.status
            state.code = payload.code
        },
        userProfile: (state, { payload }) => {
            state.isLoading = false
            state.isError = false
            state.user = payload.data
            state.dark_mode = payload.data.dark_mode
            state.err_msg = payload.message
        },
        onFail: (state, { payload }) => {
            state.isLoading = false
            state.err_msg = payload.data
            state.isError = true
            state.status = payload.status
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

export const { changeMode } = login.actions

export default login.reducer
