import api from '../../api/instance';
import axiosConfigHeader from '../AxiosConfigHeader';

const ApiGetUserByRoleAndRequirement = async ({ roleId, requirementId }) => {
   try {

      const response = await api.get('/User/GetUserByRoleInRequirement', {
         axiosConfigHeader,
         params: {
            RoleFromInput: roleId,
            requirementId: requirementId
         }
      })
      return response.data[0];

   } catch (error) {
      console.log('>>> Api Get User By Role and Requirement Error : ', error)
   }
}

export default ApiGetUserByRoleAndRequirement;