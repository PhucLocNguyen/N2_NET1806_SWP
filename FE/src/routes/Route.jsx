import { lazy } from "react";

const ChatStaff = lazy(()=>import("../component/staff/ChatStaff"));

const Home = lazy(() => import('../component/home/Home'));
const Design = lazy(() => import('../component/category/Category'));
const BlogList = lazy(() => import('../component/blog_list/blogList'));
const ListAll = lazy(() => import('../component/category/ListAll'));
const DesignInfo = lazy(() => import('../component/order/DesignInfo'));
const Blog = lazy(() => import('../component/blog/Blog'));
const RequirementOrderSection = lazy(() => import('../component/requirements/Create/RequirementOrderSection'));
const Login = lazy(() => import('../component/login/Login'));
const PageError = lazy(() => import('../component/pageerror/PageError'));
const RequirementDetail = lazy(() => import('../component/manager/RequirementDetail'));
const StaffLogin = lazy(() => import("../component/login/StaffLogin"));
const StaffList = lazy(() => import('../component/admin/staffList/StaffList'));
const Empty = lazy(() => import('../component/empty/Empty'));
const Dashboard = lazy(() => import('../component/admin/dashboard/Dashboard'));
const BlogCreate = lazy(() => import('../component/manager/BlogCreate'));
const ListRequirement = lazy(() => import('../component/manager/ListRequirement'));

const ConfirmationAccount = lazy(() => import("../component/login/ConfirmationAccount"));
const WorkingBoard = lazy(() => import('../component/staff/WorkingBoard'));
const Chat = lazy(() => import('../component/chat/Chat'));
const ListMasterGemstone = lazy(() => import('../component/manager/masterGemstone/ListMasterGemstone'));
const ListDesign = lazy(() => import('../component/manager/design/ListDesign'));
const ListStone = lazy(() => import('../component/manager/stone/ListStone'));

const StaffLayout = lazy(() => import('../component/layout/StaffLayout'));

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
      component: Login,
      layout: null
   },
   {
      path: '/error',
      component: PageError,
      layout: null
   },
   {
      path: '/admin/login',
      component: StaffLogin,
      layout: null
   },
   {
      path: '/Staff',
      component: Staff,
      layout: null
   },
   {
      path: '/confirmation-account',
      component: ConfirmationAccount,
      layout: null
   }
]

const privateRoutes = [
   {
      path: '/design/create-requirement/:id',
      component: RequirementOrderSection,
      role: ['Customer'],
      layout: null
   },
   {
      path: "/chat",
      component: Chat,
      role: ['Customer', 'Sale', 'DesignStaff', 'ProductStaff', 'Manager']

   },
   {
      path: '/manager',
      component: StaffLayout,
      children: [
         { index: true, component: ListRequirement },
         { path: 'blog-create', component: BlogCreate },
         { path: 'price-quote/:id', component: RequirementDetail }
      ],
      role: ['Manager']
   },
   {
      path: '/admin',
      component: StaffLayout,
      children: [
         { index: true, component: StaffList },
         { path: 'dashboard', component: Dashboard }
      ],
      role: ['Admin']
   },
   {
      path: '/staff',
      component: StaffLayout,
      children: [
         { index: true, component: WorkingBoard },
         { path: 'chat', component: ChatStaff }
      ],
      role: ['DesignStaff', 'ProductStaff', "Sale"],
   }

]

export { publicRoutes, privateRoutes }