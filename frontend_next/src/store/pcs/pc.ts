import { createSlice } from '@reduxjs/toolkit'
import { pcStore, getPcList } from '@/store/apis'
import { IPcStore } from '@/types/pc'

const initialState: IPcStore = {
  isLoading: false,
  pc: null,
  isError: false,
  reviewNum: '',
  ratingNum: '',
  code: '',
  err_msg: '',
}

const pc = createSlice({
  name: 'pc',
  initialState,
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

export const getPc = (id: string | number) =>
  pcStore({
    url: getPcList + id,
    method: 'get',
    onStart: pc.actions.onStart.type,
    onSuccess: pc.actions.onSuccess.type,
    onFail: pc.actions.onFail.type,
  })

export default pc.reducer
