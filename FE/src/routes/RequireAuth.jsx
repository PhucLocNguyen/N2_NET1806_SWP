import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ allowedRole }) {
   const { role } = useAuth();
   const location = useLocation();

   console.log(role)
   console.log('>>> Allowed: ', allowedRole)

   if (!role || role === '') {

      return (<Navigate to='/login' state={{ from: location }} replace />)

   } else if (role === allowedRole) {

      return (<Outlet />)

   } else {

      return (<Navigate to='error' replace />)

   }

}

export default RequireAuth;