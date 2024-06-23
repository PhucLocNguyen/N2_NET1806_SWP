import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import AuthProvider from './context/AuthContext.jsx'
import './App.css'

import RequireAuth from './routes/RequireAuth.jsx'
import { publicRoutes, privateRoutes } from './routes/Route.jsx'
import DefaultLayout from './component/layout/DefaultLayout.jsx'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (


    <AuthProvider>
      <Suspense>
        <Routes>

          {/* Route tự viết để test */} 


           {/* Route tự viết không ghi qua phần này */}
         

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

          {/* Private route */}

          {privateRoutes.map((route, index) => {
            let Page = route.component;

            return (
              <Route key={index} element={<RequireAuth allowedRole={route.role} />}>
                <Route path={route.path} element={<Page />} />
              </Route>
            )
          })}


        </Routes>
      </Suspense>
      <ToastContainer/>
    </AuthProvider>

  )
}

export default App
