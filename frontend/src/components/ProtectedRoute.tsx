// ProtectedRoute.tsx
import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from 'components/AuthContext'

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to={'/sign-in'} replace/>
  }

  return children
}

export default ProtectedRoute
