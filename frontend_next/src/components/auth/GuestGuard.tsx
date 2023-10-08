// React Import
import { FC, Fragment, ReactElement, ReactNode, useEffect } from 'react'

// Next Import
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

// Hooks Import
// import {} from ''

interface GuestGuard {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard: FC<GuestGuard> = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (window.localStorage.getItem('token')) {
      router.replace('/')
    }
  }, [router.route])

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <Fragment>{children}</Fragment>
}

export default GuestGuard