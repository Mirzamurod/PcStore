import { ReactNode } from 'react'
import { SxProps } from '@mui/material'

export interface IInput {
  label?: string
  sx?: SxProps
  /**
   * Bu label va placeholder o'rniga o'tishi mumkin ya'ni ula yozilmasa auto o'tib ketadi
   */
  name: string
  placeholder?: string
  end?: string | ReactNode
  type?: string
  variant?: 'outlined' | 'filled' | 'standard'
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string
  isLoading?: boolean
  endPosition?: string
  /**
   * Agar true berilmasa input oxiridan chiqadi
   */
  start?: boolean
  multiline?: boolean
  rows?: number
}

export interface IPasswordInput {
  isLoading?: boolean
  name: string
  label?: string
  sx: SxProps
  variant?: 'outlined' | 'filled' | 'standard'
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string
  placeholder?: string
}
