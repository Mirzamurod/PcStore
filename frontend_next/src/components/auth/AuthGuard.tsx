// React Imports
import { Fragment, ReactElement, ReactNode, useEffect } from 'react'

// Next Import
import { useRouter } from 'next/router'

// Hooks Import
import { useAuth } from '@/hooks/useAuth'
import { useAppSelector } from '@/store'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  const { user } = useAppSelector(state => state.login)

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (typeof window !== 'undefined') {
      if (user === null && !window.localStorage.getItem('token')!) {
        if (router.asPath !== '/') {
          router.replace({ pathname: '/login', query: { returnUrl: router.asPath } })
        } else {
          router.replace('/login')
        }
      }
    }
  }, [router.route])

  if (auth.loading || user === null) {
    return fallback
  }

  return <Fragment>{children}</Fragment>
}

export default AuthGuard
