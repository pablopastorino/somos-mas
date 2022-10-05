import { useRouter } from 'next/router'
import { useContext, useLayoutEffect } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Dashboard() {
  const router = useRouter()
  const { state } = useContext(AuthContext)

  console.log(state)
  useLayoutEffect(() => {
    state?.user ? router.push('/dashboard') : router.push('/')
  }, [])

  return (
    state?.user && (
      <div>
        <h2>Dashboard</h2>
      </div>
    )
  )
}
