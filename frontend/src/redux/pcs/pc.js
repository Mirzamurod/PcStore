import { createSlice } from '@reduxjs/toolkit'
import { apiPcStore, getPcList } from '../api'

const pc = createSlice({
    name: 'pc',
    initialState: {
        isLoading: false,
        pc: '',
        isError: false,
        reviewNum: '',
        ratingNum: '',
        code: '',
        err_msg: '',
    },
    reducers: {
        onStart: state => {
            state.isLoading = true
            state.isError = false
        },
        onSuccess: (state, { payload }) => {
            state.isLoading = false
            state.pc = payload.data
            state.reviewNum = payload.reviewNum
            state.ratingNum = payload.ratingNum
            state.isError = false
        },
        onFail: (state, { payload }) => {
            state.isLoading = false
            state.code = payload.message.code
            state.err_msg = payload.data
            state.isError = true
        },
    },
})

export const getPc = id =>
    apiPcStore({
        url: getPcList + id,
        method: 'get',
        onStart: pc.actions.onStart.type,
        onSuccess: pc.actions.onSuccess.type,
        onFail: pc.actions.onFail.type,
    })

export default pc.reducer
