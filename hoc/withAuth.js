import { useRouter } from 'next/router'
import { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

const withAuth = WrappedComponent => props => {
  // if (typeof window === 'undefined') return null

  const router = useRouter()
  const value = useContext(AuthContext)

  if (!value.user) router.replace('/', '/inicio')

  return <WrappedComponent {...props} />
}

export default withAuth
