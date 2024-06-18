import { jwtDecode } from "jwt-decode";

const useAuth = () => {
   const accessToken = localStorage.getItem('userInfo');
   const role = jwtDecode(accessToken).Role


   return { accessToken, role }
}

export default useAuth;