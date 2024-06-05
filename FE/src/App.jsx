import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

import DesignInfo from './component/order/DesignInfo.jsx'
import { publicRoutes } from './routes/Route.jsx'
import DefaultLayout from './component/layout/DefaultLayout.jsx'

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path='/a' element={<DesignInfo></DesignInfo>}></Route>
        {publicRoutes.map((route, index) => {
          let Page = route.component

          return (
            // Route cho nhung thanh phan cha
            <Route key={index} index={route.index ? true : undefined} path={route.index ? undefined : route.path} element={<DefaultLayout> <Page />  </DefaultLayout>}>

              {/* Route neu co child trong file Route.jsx */}
              {route.children && route.children.map((childRoute, childIndex) => {
                let ChildPage = childRoute.component
                return (
                  <Route key={childIndex} index={childRoute.index ? true : undefined} path={childRoute.index ? undefined : childRoute.path} element={<ChildPage />} />
                )
              })}

            </Route>
          )
        })}

      </Routes>
    </Suspense>
  )
}

export default App
