import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Logout from "../../utils/Logout";
function LogoutStaff() {
  const navigate = useNavigate();
  const { role } = useAuth();

  return (
    <div
      onClick={() => {
        navigate(Logout(role),{replace:true});
        toast.success("Logout successful");
      }}
    >
      <div className="mt-[1.5rem]  w-[100%] cursor-pointer group flex items-center ">
        <LogoutIcon className="group-hover:text-[red]" />
        <h2 className=" ml-[10px] text-[1.1rem] font-medium text-[red] ">
          Logout
        </h2>
      </div>
    </div>
  );
}

export default LogoutStaff;