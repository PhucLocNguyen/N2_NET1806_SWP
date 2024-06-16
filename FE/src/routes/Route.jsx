import { lazy } from "react"

const Home = lazy(() => import('../component/home/Home'));
const Design = lazy(() => import('../component/category/Category'));
// const BlogList = lazy(() => import('../component/blog_list/blogList'));
const ListAll = lazy(() => import('../component/category/ListAll'));
 const DesignInfo = lazy(() => import('../component/order/DesignInfo'));
// const Blog = lazy(() => import('../component/blog/Blog'));
const RequirementOrderSection = lazy(() => import('../component/requirements/Create/RequirementOrderSection'));
const Login = lazy(() => import('../component/login/Login'));
const PageError = lazy(() => import('../component/pageerror/PageError'));



const publicRoutes = [
   {
      index: true,
      component: Home
   },
   {
      path: '/design',
      component: Design,
      children: [
         { index: true, component: ListAll },
         { path: 'earring', component: ListAll },
         { path: 'bracelet', component: ListAll },
         { path: 'necklace', component: ListAll },
         { path: 'ring', component: ListAll }
      ]

   },
   {
      path: '/design/:id',
      component: DesignInfo
   },
   // {
   //    path: '/blog',
   //    component: BlogList
   // },
   // {
   //    path: '/blog/:id',
   //    component: Blog
   // },
   {
      path: '/login',
      component: Login
   },
   {
      path: '/error',
      component: PageError
   }
]

const privateRoutes = [
   {
      path: '/design/:id/create-requirement',
      component: RequirementOrderSection,
      role: 'nguyenduchung'
   }
]

export { publicRoutes, privateRoutes }