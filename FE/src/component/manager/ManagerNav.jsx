import ListAltIcon from '@mui/icons-material/ListAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DiamondIcon from '@mui/icons-material/Diamond';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import RuleIcon from '@mui/icons-material/Rule';
import SpokeIcon from '@mui/icons-material/Spoke';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { NavLink } from 'react-router-dom';
import LogoutStaff from '../staff/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
function ManagerNav() {
   return (
      <>
         <div className="fixed top-0 bottom-0 left-0 px-[1.7rem] h-[100vh] w-[20%] max-w-[20%] border-r-[1px] border-solid border-[#e9eaf3] bg-[#f7f9fc] pt-[3rem]">
            <div className="relative w-[100%] py-[1.7rem]">

               <NavLink to='/manager' end className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="w-[100%] cursor-pointer group flex items-center ">
                     <MonetizationOnIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Price Quote</h2>
                  </div>
               </NavLink>

               <NavLink to='re-price-quote' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <CurrencyExchangeIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Re-price quote</h2>
                  </div>
               </NavLink>

               <NavLink to='blog-management' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <ListAltIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Blog Management</h2>
                  </div>
               </NavLink>
               <NavLink to='orders' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <AssignmentIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Manage order</h2>
                  </div>
               </NavLink>
               <NavLink to='material-management' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <DataSaverOnIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Material</h2>
                  </div>
               </NavLink>
               <NavLink to='master-gemstone' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <DiamondIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Master Gemstone</h2>
                  </div>
               </NavLink>

               <NavLink to='stone-management' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <SpokeIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Stone</h2>
                  </div>
               </NavLink>

               <NavLink to='design-management' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <DesignServicesIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Design</h2>
                  </div>
               </NavLink>

               <NavLink to='design-rule' className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
                  <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
                     <RuleIcon className="group-hover:text-[rgb(66,133,244)]" />
                     <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Design Rule</h2>
                  </div>
               </NavLink>
               <LogoutStaff />
            </div>
         </div>
      </>
   )
}

export default ManagerNav;