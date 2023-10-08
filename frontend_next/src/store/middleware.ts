import axios from 'axios'
import { toast } from 'react-toastify'
import { decode } from 'js-base64'
import { createAction } from '@reduxjs/toolkit'
import { IPcStore } from '@/types/middleware'

const middleware =
  ({ dispatch }: { dispatch: any }) =>
  (next: any) =>
  (action: { type: string; payload: IPcStore }) => {
    if (action.type !== 'pcStore') {
      next(action)
      return
    }

    next(action)

    const { url, method, params, data, onStart, onSuccess, onFail } = action.payload

    const token = localStorage.getItem('token')

    const headers = token ? { Authorization: `Bearer ${decode(token)}` } : null

    dispatch({ type: onStart })

    // @ts-ignore
    axios({
      baseURL: 'http://localhost:5000/api/',
      // baseURL: 'http://192.168.100.15:5000/api/',
      method,
      data,
      url,
      params,
      headers,
    })
      .then(res => {
        if (res.status === 200 || res.status === 201)
          dispatch({ type: onSuccess, payload: res.data })
        else dispatch({ type: onFail, payload: res })
      })
      .catch(error => {
        const data = { ...error?.response?.data }
        toast.error(data?.data, { position: 'top-right', theme: 'dark' })
        dispatch({ type: onFail, payload: error })
      })
  }

export default middleware