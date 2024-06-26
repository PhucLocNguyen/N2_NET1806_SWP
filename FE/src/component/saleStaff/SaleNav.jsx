
import ListAltIcon from '@mui/icons-material/ListAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom';

function SaleNav() {
   return (
      <>
         <div className="fixed top-0 bottom-0 left-0 px-[1.7rem] h-[100vh] w-[20%] max-w-[20%] border-r-[1px] border-solid border-[#e9eaf3] bg-[#f7f9fc] pt-[3rem]">
            <div className="relative w-[100%] py-[1.7rem]">

                  <Link to="/admin/board" className="w-[100%] cursor-pointer group flex items-center ">
                     <ListAltIcon className="group-hover:text-[rgb(66,133,244)]" />
                  <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Order</h2>
                  </Link>
               <Link to="/admin/chat" className="mt-[1.5rem] w-[100%] cursor-pointer group flex items-center ">
                  <MonetizationOnIcon className="group-hover:text-[rgb(66,133,244)]" />
                  <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Chat</h2>
                  </Link>

               <Link  to="# " className="mt-[1.5rem] w-[100%] cursor-pointer group flex items-center ">
                  <MonetizationOnIcon className="group-hover:text-[rgb(66,133,244)]" />
                  <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">Logout</h2>
               </Link>

            </div>
         </div>
      </>
   )
}

export default SaleNav;