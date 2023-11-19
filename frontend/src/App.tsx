// App.tsx
import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CurrencyConverter from 'pages/Converter/Converter'
import Favorite from 'pages/Favorite/Favorite'
import { PageExample } from 'pages/PageExample/PageExample'
import { PageNotFound } from 'pages/PageNotFound/PageNotFound'
import Selection from 'pages/Selection/Selection'
import SignIn from 'pages/sign-in/SignIn'
import SignUp from 'pages/sign-up/SignUp'

import { AuthProvider } from 'components/AuthContext'
import ProtectedRoute from 'components/ProtectedRoute'

import Header from './components/Header'

const pathToNode: Array<{ path: string, Element: any }> = [
  { path: '/', Element: PageExample },
  { path: '/example', Element: PageExample },

  { path: '/converter/:currencyPair', Element: CurrencyConverter },

  { path: '/favorite', Element: Favorite },
  { path: '/selection', Element: Selection }
]

function App () {
  return (
    <AuthProvider>
      <div className={'App'}>
        <BrowserRouter>
          <Header/>
          <Routes>
            {pathToNode.map(({ path, Element }, index) => (
              <Route key={index} path={path} element={
                <ProtectedRoute>
                  <Element/>
                </ProtectedRoute>
              }
              />
            ))}
            <Route path={'/sign-in'} element={<SignIn/>}/>
            <Route path={'/sign-up'} element={<SignUp/>}/>
            <Route path={'*'} element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App
