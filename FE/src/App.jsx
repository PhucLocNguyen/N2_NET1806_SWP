import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Login from './component/login/Login.jsx'
import Home from './component/home/Home.jsx'
import Category from './component/category/Category.jsx'
import ListAll from './component/category/ListAll.jsx'
// import ListEarring from './component/category/ListEarring.jsx'
// import ListBracelet from './component/category/ListBracelet.jsx'
import ListNecklace from './component/category/ListNecklace.jsx'
import ListRing from './component/category/ListRing.jsx'
import './App.css'
import Blog from "./component/blog/Blog.jsx"
import Footer from "./component/footer/Footer.jsx"
import Navbar from "./component/nav/Navbar.jsx"
const ListEarring = lazy(() => import('./component/category/ListEarring.jsx'))
const ListBracelet = lazy(() => import('./component/category/ListBracelet.jsx'))
import { publicRoutes } from './routes/Route.jsx'
import DefaultLayout from './component/layout/DefaultLayout.jsx'
import BlogList from "./component/blog_list/blogList.jsx"

function App() {
  return (
    <>
    <Suspense>
      <Routes>
        <Route path='/footer' element={<Blog></Blog>}></Route>
        {publicRoutes.map((route, index) => {
          let Page = route.component
          return <Route path={route.path} element={<DefaultLayout> <Page/>  </DefaultLayout>}></Route>
        })}
      </Routes>
    </Suspense>
    
    {/* <Navbar />
    <Blog />
    <Footer /> */}
    </>
    
  )
}

export default App
