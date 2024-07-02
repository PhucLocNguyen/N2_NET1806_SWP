import { lazy } from "react";

const ChatStaff = lazy(() => import("../component/staff/ChatStaff"));

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

const OrderDetail = lazy(()=>import("../component/orderCustomer/OrderDetail"));
const OrderCustomer = lazy(()=>import("../component/orderCustomer/OrderCustomer"));
const PaymentResponse = lazy(()=>import("../component/payment/PaymentResponse"));

const ConfirmationAccount = lazy(() => import("../component/login/ConfirmationAccount"));
const WorkingBoard = lazy(() => import('../component/staff/WorkingBoard'));
const Chat = lazy(() => import('../component/chat/Chat'));
const ListMasterGemstone = lazy(() => import('../component/manager/masterGemstone/ListMasterGemstone'));
const ListDesign = lazy(() => import('../component/manager/design/ListDesign'));
const ListStone = lazy(() => import('../component/manager/stone/ListStone'));
const Warranty = lazy(() => import('../component/saleStaff/Warranty'));
const WarrantyDetail = lazy(() => import('../component/saleStaff/WarrantyDetail'));

const StaffLayout = lazy(() => import('../component/layout/StaffLayout'));

const PlanningList = lazy(() => import('../component/designProductPlan/PlanningList'));

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
      path: '/confirmation-account',
      component: ConfirmationAccount,
      layout: null
   },
   {
      path: '/payment/response',
      component: PaymentResponse,
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
         { path: 'price-quote/:id', component: RequirementDetail },
         { path: 'master-gemstone', component: ListMasterGemstone },
         { path: 'design-management', component: ListDesign },
         { path: 'stone-management', component: ListStone }
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
         { path: 'chat', component: ChatStaff },
         { path: 'warranty', component: Warranty },
         { path: 'warranty-detail/:id', component: WarrantyDetail}
      ],
      role: ['DesignStaff', 'ProductStaff', "Sale"],
   },
  {
    path:"/my-order",
    component:Empty,
    children:[
        {index:true, component: OrderCustomer},
        {path:':id', component: OrderDetail}
      ],
    role:['Customer']
  }
]

export { publicRoutes, privateRoutes }