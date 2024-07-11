import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";
import LogoutStaff from "../../component/staff/Logout";

function ProductNav() {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 px-[1.7rem] h-[100vh] w-[20%] max-w-[20%] border-r-[1px] border-solid border-[#e9eaf3] bg-[#f7f9fc] pt-[3rem]">
        <div className="relative w-[100%] py-[1.7rem]">
          <NavLink to="/staff" end className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
            <div className="w-[100%] cursor-pointer group flex items-center ">
              <DashboardIcon className="group-hover:text-[rgb(66,133,244)]" />
              <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">
                Board
              </h2>
            </div>
          </NavLink>

          <NavLink to="chat" className={({ isActive }) => `${isActive ? 'text-[rgb(66,133,244)]' : ''}`}>
            <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
              <ChatIcon className="group-hover:text-[rgb(66,133,244)]" />
              <h2 className=" ml-[10px] text-[1.1rem] font-medium group-hover:text-[rgb(66,133,244)]">
                Chat
              </h2>
            </div>
          </NavLink>

          <LogoutStaff />
        </div>
      </div>
    </>
  );
}

export default ProductNav;
