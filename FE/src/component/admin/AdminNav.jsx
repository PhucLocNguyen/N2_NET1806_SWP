import { motion } from 'framer-motion';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { NavLink } from 'react-router-dom';
import LogoutStaff from '../staff/Logout';

function AdminNav() {
   return (
      <>

         <div className="fixed top-0 bottom-0 left-0 px-[1.7rem] h-[100vh] w-[20%] max-w-[20%] border-r-[1px] border-solid border-[#e9eaf3] bg-[#f7f9fc] pt-[3rem]">
            <div className="relative w-[100%] py-[1.7rem]">
               <NavLink to='/admin' end className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="w-[100%] cursor-pointer group flex items-center ">
                     <InsertChartIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Staff</h2>
                  </div>
               </NavLink>

               <NavLink to='dashboard' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem] w-[100%] cursor-pointer group flex items-center ">
                     <AssignmentIndIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Dashboard</h2>
                  </div>
               </NavLink>
               <LogoutStaff />
            </div>
         </div>
      </>
   )
}

export default AdminNav