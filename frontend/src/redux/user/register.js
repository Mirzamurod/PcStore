import { createSlice } from '@reduxjs/toolkit'
import { apiPcStore, registerUser } from './../api'

const register = createSlice({
    name: 'register',
    initialState: { isLoading: false, isError: false, code: '', err_msg: '' },
    reducers: {
        onStart: state => {
            state.isLoading = true
            state.isError = false
        },
        onSuccess: (state, { payload }) => {
            console.log(payload)
            state.isLoading = false
            state.code = payload.message.code
        },
        onFail: (state, { payload }) => {
            state.isLoading = false
            state.isError = true
            state.err_msg = { ...payload.response.data.message }
        },
    },
})

export const addUser = data =>
    apiPcStore({
        url: registerUser,
        method: 'post',
        data,
        onStart: register.actions.onStart.type,
        onSuccess: register.actions.onSuccess.type,
        onFail: register.actions.onFail.type,
    })

export default register.reducer
