import { Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import AuthProvider from './context/AuthContext.jsx'
import './App.css'

import RequireAuth from './routes/RequireAuth.jsx'
import { publicRoutes, privateRoutes } from './routes/Route.jsx'
import DefaultLayout from './component/layout/DefaultLayout.jsx'


// Import test viết bên dưới
import Blog from "./component/blog/Blog.jsx"
import Footer from "./component/footer/Footer.jsx"
import Navbar from "./component/nav/Navbar.jsx"
import RequirementOrderSection from './component/requirements/Create/RequirementOrderSection.jsx'


import ListRequirement from './component/manager/ListRequirement.jsx'
import RequirementDetail from './component/manager/RequirementDetail.jsx'
import ManagerLayout from './component/manager/layout/ManagerLayout.jsx'
import StaffLogin from './component/login/StaffLogin.jsx'
import BlogCreate from './component/manager/BlogCreate.jsx'

import AdminLayout from './component/admin/AdminLayout.jsx'
import StaffList from './component/admin/staffList/StaffList.jsx'

import Login from './component/login/Login.jsx'


function App() {
  return (

    <AuthProvider>
      <Suspense>
        <Routes>
          {/* Route tự viết để test */}

          <Route path='/a' element={<ManagerLayout> <ListRequirement/> </ManagerLayout>}></Route>
          <Route path='/b' element={<AdminLayout> <StaffList/> </AdminLayout>}></Route>

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
    </AuthProvider>
  )
}

export default App
