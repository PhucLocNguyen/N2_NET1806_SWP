import { lazy } from "react"
import Chat from "../component/chat/Chat";
const OrderBoard = lazy(()=>import("../component/saleStaff/OrderBoard"));
const AdminChat = lazy(()=> import("../component/saleStaff/AdminChat"));
const SaleLayout = lazy(()=>import("../component/saleStaff/layout/AdminLayout"));
const ConfirmationAccount = lazy(()=>import("../component/login/ConfirmationAccount"));
const Home = lazy(() => import('../component/home/Home'));
const Design = lazy(() => import('../component/category/Category'));
const BlogList = lazy(() => import('../component/blog_list/blogList'));
const ListAll = lazy(() => import('../component/category/ListAll'));
const DesignInfo = lazy(() => import('../component/order/DesignInfo'));
const Blog = lazy(() => import('../component/blog/Blog'));
const RequirementOrderSection = lazy(() => import('../component/requirements/Create/RequirementOrderSection'));
const Login = lazy(() => import('../component/login/Login'));
const PageError = lazy(() => import('../component/pageerror/PageError'));
const Staff = lazy(() => import('../component/designProductPlan/PlanningList'));
const RequirementDetail = lazy(() => import('../component/manager/RequirementDetail'));
const StaffLogin = lazy(()=>import( "../component/login/StaffLogin"));

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
   
   {
      path: '/blog',
      component: BlogList
   },
   {
      path: '/blog/:id',
      component: Blog
   },
   {
      path: '/login',
      component: Login
   },
   {
      path: '/error',
      component: PageError
   },
   {
      path: '/manager/price-quote/:id',
      component: RequirementDetail
   },
   {
      path:'/admin/login',
      component: StaffLogin
   },
   {
      path:'/confirmation-account',
      component:ConfirmationAccount
   }
]

const privateRoutes = [
   {
      path: '/design/create-requirement/:id',
      component: RequirementOrderSection,
      role: ['Customer']
   },
   {path:"/chat",
   component:Chat,
   role:['Customer']
   }
   ,
   {
      path:"/admin",
      component:SaleLayout,
      role:['Sale']
   }
   , {
      path:"/admin/chat",
      component:AdminChat,
      role:['Sale','DesignStaff','ProductStaff','Manager'],
   },
   {
      path:"/admin/board",
      component:OrderBoard,
      role:['Sale','DesignStaff','ProductStaff','Manager']

   }
  
   
]

export { publicRoutes, privateRoutes }