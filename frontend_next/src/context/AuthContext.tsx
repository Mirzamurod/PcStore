// React Imports
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

// Next Import
import { useRouter } from 'next/router'
import { UserDataType } from '@/types/user'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { AppDistach } from '@/store'
import { userProfile } from '@/store/user/login'

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
  const dispatch = useDispatch<AppDistach>()

  // States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const token = window.localStorage.getItem('token')!
      if (token) {
        setLoading(true)
        await axios({
          url: 'http://localhost:5000/api/users/profile',
          headers: { Authorization: 'Bearer ' + token },
        })
          .then(async res => {
            setLoading(false)
            dispatch(userProfile())
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
  }, [])

  const values = { user, loading, setUser, setLoading }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
