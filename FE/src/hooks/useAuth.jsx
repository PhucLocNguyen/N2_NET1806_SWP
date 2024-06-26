import { jwtDecode } from "jwt-decode";

const useAuth = () => {

   var role = '';
   var accessToken = '';
   var UserId = null;

      try {
         if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('userInfo');
            if (token) {
               accessToken=token;
               const decodeToken = jwtDecode(token);
               role = decodeToken.Role;
               UserId = decodeToken.UserId;
            }
         }
      } catch (error) {
         console.error(error);
      }

   return { accessToken, role , UserId}

}

export default useAuth;