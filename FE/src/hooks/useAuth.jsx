import { jwtDecode } from "jwt-decode";

const useAuth = () => {
   var role = '';
   var accessToken = '';

      try {
         if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('userInfo');
            if (token) {
               accessToken=token;
               const decodeToken = jwtDecode(token);
               role = decodeToken.Role;
            }
         }
      } catch (error) {
         console.error(error);
      }



   return { accessToken, role }
}

export default useAuth;