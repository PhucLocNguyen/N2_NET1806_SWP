import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx';
const FetchApiUserBasedRoleInRequirement = async (roleId, requirementId) => {
   try {
      const response = await api.get('/User/GetUserByRoleInRequirement',{axiosConfigHeader,params:{
        RoleFromInput: roleId,
        requirementId: requirementId
      }});
      return response.data[0]; // Directly return the data from the response
   } catch (error) {
      console.error(error);
      return {}; // Return an empty array or handle the error as needed
   }
}
export { FetchApiUserBasedRoleInRequirement }