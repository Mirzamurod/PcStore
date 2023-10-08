// React Imports
import { Fragment, ReactElement, ReactNode, useEffect } from 'react'

// Next Import
import { useRouter } from 'next/router'

// Hooks Import
import { useAuth } from '@/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.user === null && !window.localStorage.getItem('token')!) {
      if (router.asPath !== '/') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath },
        })
      } else {
        router.replace('/login')
      }
    }
  }, [router.route])

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <Fragment>{children}</Fragment>
}

export default AuthGuard