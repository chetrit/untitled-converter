import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CurrencyConverter from 'pages/Converter/Converter'
import Favorite from 'pages/Favorite/Favorite'
import { PageExample } from 'pages/PageExample/PageExample'
import { PageNotFound } from 'pages/PageNotFound/PageNotFound'
import Selection from 'pages/Selection/Selection'
import SignIn from 'pages/sign-in/SignIn'
import SignUp from 'pages/sign-up/SignUp'

import Header from './components/Header'

const pathToNode: Array<{ path: string, Element: any }> = [
  { path: '/', Element: PageExample },
  { path: '/example', Element: PageExample },
  { path: '/sign-in', Element: SignIn },
  { path: '/sign-up', Element: SignUp },
  { path: '/converter', Element: CurrencyConverter },
  { path: '/favorite', Element: Favorite },
  { path: '/selection', Element: Selection }
]

function App () {
  const fakeUser = {
    name: 'Jane Doe',
    profilePicture: '/path-to-profile-picture.jpg' // replace with the actual path to the image
  }

  return (
    <div className={'App'}>
      <BrowserRouter>
        <Header user={fakeUser}/>
        <Routes>
          {pathToNode.map(({ path, Element }, index) => (
            <Route key={index} path={path} element={<Element/>}/>
          ))}
          <Route path={'*'} element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
