import { lazy } from "react"
// import Home from "../component/home/Home"
// import Navbar from "../component/nav/Navbar"
// import Category from "../component/category/Category"
const Home = lazy(() => import('../component/home/Home'))
const Navbar = lazy(() => import('../component/nav/Navbar'))
const Design = lazy(() => import('../component/category/Category'))

const publicRoutes = [
   {path: '/home', component: Home},
   {path: '/design', component: Design}
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }