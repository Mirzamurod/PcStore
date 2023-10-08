import { createSlice } from '@reduxjs/toolkit'
import { pcStore, getPcsList } from '@/store/apis'
import { IPcsStore } from '@/types/pc'

const initialState: IPcsStore = {
  isLoading: false,
  pcs: [],
  isError: false,
  code: '',
  err_msg: '',
}

const pcs = createSlice({
  name: 'pcs',
  initialState,
  reducers: {
    onStart: state => {
      state.isLoading = true
      state.isError = false
      state.pcs = []
    },
    onSuccess: (state, { payload }) => {
      state.isLoading = false
      state.pcs = payload.data
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

export const getPcs = () =>
  pcStore({
    url: getPcsList,
    method: 'get',
    onStart: pcs.actions.onStart.type,
    onSuccess: pcs.actions.onSuccess.type,
    onFail: pcs.actions.onFail.type,
  })

export default pcs.reducer
