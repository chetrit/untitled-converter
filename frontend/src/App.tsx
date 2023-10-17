import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PageExample } from 'pages/PageExample/PageExample'
import { PageNotFound } from 'pages/PageNotFound/PageNotFound'

const pathToNode: Array<{ path: string, Element: any }> = [
  { path: '/', Element: PageExample },
  { path: '/example', Element: PageExample }
]

function App () {
  return (
    <div className={'App'}>
      <BrowserRouter>
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
