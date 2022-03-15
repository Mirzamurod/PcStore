import { createSlice } from '@reduxjs/toolkit'
import { addreview, apiPcStore, getreviews } from '../api'

const reviews = createSlice({
    name: 'reviews',
    initialState: {
        isLoading: false,
        reviews: [],
        isError: false,
        codeReviews: '',
    },
    reducers: {
        onStart: state => {
            state.isLoading = true
            state.isError = false
        },
        onSuccess: (state, { payload }) => {
            state.isLoading = false
            state.reviews = payload.data
            state.reviews.sort(
                (a, b) => Date.parse(new Date(b.createdAt)) - Date.parse(new Date(a.createdAt))
            )
            state.isError = false
        },
        onFail: (state, { payload }) => {
            state.isLoading = false
            state.codeReviews = payload.message.code
            state.isError = true
        },
        addUpdateDeleteSuccess: (state, { payload }) => {
            state.isLoading = false
            state.codeReviews = payload.message.code
            state.isError = false
        },
    },
})

export const getReviews = id =>
    apiPcStore({
        url: getreviews + id,
        method: 'get',
        onStart: reviews.actions.onStart.type,
        onSuccess: reviews.actions.onSuccess.type,
        onFail: reviews.actions.onFail.type,
    })

export const addReview = data =>
    apiPcStore({
        url: addreview + data.id,
        method: 'post',
        data,
        onStart: reviews.actions.onStart.type,
        onSuccess: reviews.actions.addUpdateDeleteSuccess.type,
        onFail: reviews.actions.onFail.type,
    })

export default reviews.reducer
