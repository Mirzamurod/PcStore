import axios from 'axios'
import { decode } from 'js-base64'
import { toast } from 'react-toastify'

const middleware =
    ({ dispatch }) =>
    next =>
    action => {
        if (action.type !== 'apiPcStore') {
            next(action)
            return
        }

        next(action)

        const { method, url, params, data, onStart, onSuccess, onFail } = action.payload

        const token = localStorage.getItem('token')

        const headers = token ? { Authorization: `Bearer ${decode(token)}` } : null

        dispatch({ type: onStart })

        axios({
            baseURL: 'http://localhost:5000/api/',
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
