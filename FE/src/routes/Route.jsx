import { lazy } from "react";
const ChatCustomer =lazy(()=>import("../component/chat/ChatCustomer"));
const OrderSupportDetail = lazy(() => import("../component/saleStaff/OrderSupportDetail"));
const OrderSupportList= lazy(() => import("../component/saleStaff/OrderSupportList"));
const ChatStaff = lazy(() => import("../component/staff/ChatStaff"));

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
const ListRequirement = lazy(() => import('../component/manager/ListRequirement'));
const ListRequirementManage = lazy(()=>import('../component/manager/OrderManage/ListRequirementManage'));
const OrderDetail = lazy(() => import("../component/orderCustomer/OrderDetail"));
const OrderCustomer = lazy(() => import("../component/orderCustomer/OrderCustomer"));
const PaymentResponse = lazy(() => import("../component/payment/PaymentResponse"));

const ConfirmationAccount = lazy(() => import("../component/login/ConfirmationAccount"));
const WorkingBoard = lazy(() => import('../component/staff/WorkingBoard'));
const ListMasterGemstone = lazy(() => import('../component/manager/masterGemstone/ListMasterGemstone'));
const ListDesign = lazy(() => import('../component/manager/design/ListDesign'));
const ListStone = lazy(() => import('../component/manager/stone/ListStone'));
const ListBlog = lazy(() => import('../component/manager/blog/ListBlog'));
const ListMaterial = lazy(() => import('../component/manager/material/ListMaterial'));
const ListDesignRule = lazy(() => import('../component/manager/designRule/ListDesignRule'));
const Warranty = lazy(() => import('../component/saleStaff/Warranty'));
const WarrantyDetail = lazy(() => import('../component/saleStaff/WarrantyDetail'));
const ListRePriceQuote = lazy(() => import('../component/manager/rePriceQuote/ListRePriceQuote'));
const RePriceDetail = lazy(() => import('../component/manager/rePriceQuote/RePriceDetail'));
const HomeNew = lazy(() => import('../component/home/HomeNew'));

const StaffLayout = lazy(() => import('../component/layout/StaffLayout'));

const RejectDesignList = lazy(() => import('../component/designProductPlan/RejectDesignList'));
const RejectDesignDetail = lazy(() => import('../component/designProductPlan/RejectDesignDetail'));

const publicRoutes = [
   {
      index: true,
      component: HomeNew
   },
   {
      path: '/design',
      component: Design,
      children: [
         { index: true, component: ListAll },
         { path: 'earrings', component: ListAll },
         { path: 'bracelet', component: ListAll },
         { path: 'chain', component: ListAll },
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
      component: ChatCustomer,
      role: ['Customer', 'Sale', 'DesignStaff', 'ProductStaff', 'Manager']

   },
   {
      path: '/manager',
      component: StaffLayout,
      children: [
         { index: true, component: ListRequirement },
         { path: 'blog-management', component: ListBlog },
         { path: 'price-quote/:id', component: RequirementDetail },
         { path: 'master-gemstone', component: ListMasterGemstone },
         { path: 'design-management', component: ListDesign },
         { path: 'material-management', component: ListMaterial },
         { path: 'stone-management', component: ListStone },
         { path: 'design-rule', component: ListDesignRule },
         { path: 're-price-quote', component: ListRePriceQuote },
         { path: 're-price-quote/:id', component: RePriceDetail },
         {path:'orders', component: ListRequirementManage}

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
         { path: 'warranty-detail/:id', component: WarrantyDetail }
      ],
      role: ['DesignStaff', 'ProductStaff', "Sale"],
   },
   {
      path: '/staff',
      component: StaffLayout,
      children: [
         { path: 'order-support', component: OrderSupportList },
         { path: 'order-support/:id', component: OrderSupportDetail}
      ],
      role: ["Sale"],
   },
   {
      path: '/staff',
      component: StaffLayout,
      children: [
         { path: 'reject-design', component: RejectDesignList },
         { path: 'reject-design/:id', component: RejectDesignDetail}
      ],
      role: ["DesignStaff"],
   },
   {
    path:"/my-order",
    component:Empty,
    children:[
        {index:true, component: OrderCustomer},
        {path:':id', component: OrderDetail}
      ],
      role: ['Customer']
   },

]

export { publicRoutes, privateRoutes }