import { createSlice } from '@reduxjs/toolkit'
import { addreview, getreviews, pcStore } from '@/store/apis'
import { IReview } from '@/types/pc'

interface IReviews {
  isLoading: boolean
  isLoadingBtn: boolean
  success: boolean
  reviews: IReview[]
  isError: boolean
}

const initialState: IReviews = {
  isLoading: false,
  isLoadingBtn: false,
  success: false,
  reviews: [],
  isError: false,
}

const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    onStart: state => {
      state.isLoading = true
      state.success = false
      state.isError = false
    },
    onSuccess: (state, { payload }) => {
      state.isLoading = false
      state.reviews = payload.data
      state.success = false
      state.reviews.sort(
        // @ts-ignore
        (a, b) => Date.parse(new Date(b.createdAt)) - Date.parse(new Date(a.createdAt))
      )
      state.isError = false
    },
    onFail: state => {
      state.isLoading = false
      state.success = false
      state.isError = true
    },
    addUpdateDeleteStart: state => {
      state.isLoadingBtn = true
      state.success = false
    },
    addUpdateDeleteSuccess: (state, { payload }) => {
      state.isLoadingBtn = false
      state.success = payload.success
    },
    addUpdateDeleteFail: state => {
      state.isLoadingBtn = false
      state.success = false
    },
  },
})

export const getReviews = (id: string) =>
  pcStore({
    url: getreviews + id,
    method: 'get',
    onStart: reviews.actions.onStart.type,
    onSuccess: reviews.actions.onSuccess.type,
    onFail: reviews.actions.onFail.type,
  })

export const addReview = (data: any) =>
  pcStore({
    url: addreview + data.id,
    method: 'post',
    data,
    onStart: reviews.actions.addUpdateDeleteStart.type,
    onSuccess: reviews.actions.addUpdateDeleteSuccess.type,
    onFail: reviews.actions.addUpdateDeleteFail.type,
  })

export default reviews.reducer
