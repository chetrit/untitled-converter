import React, { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
