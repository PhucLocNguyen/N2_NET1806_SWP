import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'

import AdminLayout from './component/admin/AdminLayout.jsx'
import StaffList from './component/admin/staffList/StaffList.jsx'
import StaffPopup from './component/admin/staffList/StaffPopup.jsx'
import Login from './component/login/Login.jsx'

import { publicRoutes } from './routes/Route.jsx'
import DefaultLayout from './component/layout/DefaultLayout.jsx'

{/* <AdminLayout> <StaffList/> </AdminLayout> */}

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path='/a' element={<AdminLayout> <StaffList/> </AdminLayout>}></Route>
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
