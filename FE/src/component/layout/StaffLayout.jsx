import { Outlet } from "react-router-dom";
import ManagerNav from "../manager/ManagerNav";
import AdminNav from "../admin/AdminNav";
import SaleNav from "../saleStaff/SaleNav";

import useAuth from "../../hooks/useAuth";

function StaffLayout({ children }) {
   const { role } = useAuth();

   let Nav = <></>;

   if (role === 'Admin') {
      Nav = AdminNav;
   } else if (role === 'Manager') {
      Nav = ManagerNav;
   } else if (role === 'Sale') {
      Nav = SaleNav;
   }

   return (
      <>
         <div className="flex ">

            {/* Nav bar */}
            <div className="w-[20%]">
               <Nav />
            </div>

            {/* Chidlren */}
            <div className="w-[80%]">
               <Outlet />
            </div>

         </div>
      </>
   )
}

export default StaffLayout;