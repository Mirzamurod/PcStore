import { createAction } from '@reduxjs/toolkit'
import { IPcStore } from '@/types/middleware'

export const pcStore = createAction<IPcStore>('pcStore')

// users
export const registerUser = 'users/add'
export const loginUser = 'users/login'
export const userprofile = 'users/profile'
export const userupdate = 'users/update'
export const userdelete = 'users/delete'
export const getUsersApi = 'users'

// pcs
export const getPcsList = 'pcs'
export const getPcList = 'pcs/' // + id

// reviews
export const getreviews = 'reviews/' // + id
export const addreview = 'reviews/' // + id
