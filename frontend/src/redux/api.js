import { createAction } from '@reduxjs/toolkit'

export const apiPcStore = createAction('apiPcStore')

// users
export const registerUser = 'users/add'
export const loginUser = 'users/login'
export const userprofile = 'users/profile'
export const userupdate = 'users/update'
export const userdelete = 'users/delete'

// pcs
export const getPcsList = 'pcs'
export const getPcList = 'pcs/' // + id

// reviews
export const getreviews = 'reviews/' // + id
export const addreview = 'pcs/addreview/' // + id
