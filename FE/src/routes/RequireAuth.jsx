import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RequireAuth({ allowedRole }) {
   const { auth } = useAuth();
   const location = useLocation();

   console.log(auth?.role)

   if (!auth?.role) {

      return (<Navigate to='/login' state={{ from: location }} replace />)

   } else if (auth?.role === allowedRole) {

      return (<Outlet />)

   } else {

      return (<Navigate to='error' replace />)

   }

   // auth?.role === allowedRole
   //    ? <Outlet />
   //    : <Navigate to='/login' state={{ from: location }} replace />

}

export default RequireAuth;