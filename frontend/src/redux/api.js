import { createAction } from '@reduxjs/toolkit'

export const apiPcStore = createAction('apiPcStore')

// users
export const registerUser = 'users/add'
export const loginUser = 'users/login'
export const userprofile = 'users/profile'

// pcs
export const getPcsList = 'pcs'
export const getPcList = 'pcs/' // + id

// reviews
export const getreviews = 'pcs/reviews/' // + id
export const addreview = 'pcs/addreview/' // + id
