// React Imports
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

// Next Import
import { useRouter } from 'next/router'
import { UserDataType } from '@/types/user'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '@/store'
import { getUserData } from '@/store/user/login'

interface IAuthValuesType {
  loading: boolean
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType) => void
}

const defaultProvider: IAuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
  // Dispatch
  const dispatch = useAppDispatch()

  // Selector
  const { token } = useAppSelector(state => state.login)

  // States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      let tokenLocal = window.localStorage.getItem('token')!
      if (token || tokenLocal) {
        setLoading(true)
        await axios({
          url: 'http://localhost:5000/api/users/profile',
          headers: { Authorization: 'Bearer ' + tokenLocal },
        })
          .then(res => {
            setLoading(false)
            dispatch(getUserData(res.data.data))
          })
          .catch(() => {
            localStorage.removeItem('token')
            setLoading(false)
            if (!router.pathname.includes('login')) router.replace('/login')
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
  }, [token])

  const values = { user, loading, setUser, setLoading }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
