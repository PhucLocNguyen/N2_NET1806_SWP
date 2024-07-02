import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx';

const FetchApiRequirementOpeningOrder= async (id) => {
   try {
      const response = await api.get(`/Requirement?Status=${id}`);
      const requirementWithStatus = response.data;
      return requirementWithStatus; 
   } catch (error) {
      console.error(error);
      return []; 
   }
}

const FetchApiRequirementByStatus = async (currentUserId,statusId) => {
   try {
      const response = await api.get(`/Requirement/GetRequirementByRole`,{
         axiosConfigHeader,params:{
            status: statusId,
            userId: currentUserId
         }
      });
      const requirementWithStatus = response.data;
      return requirementWithStatus; 
   } catch (error) {
      console.error(error);
      return []; 
   }
}
const FetchApiRequirementById= async (id) => {
   try {
      const response = await api.get(`/Requirement/${id}`);
      const requirementById = response.data;
      return requirementById; 
   } catch (error) {
      console.error(error);
      return []; 
   }
}
const FetchApiRequirementByIdSecure= async (id, UserId) => {
   try {
      const response = await api.get(`/Requirement/${id}?userId=${UserId}`);
      const requirementById = response.data;
      return requirementById; 
   } catch (error) {
      console.error(error);
      return null; 
   }
}
export { FetchApiRequirementOpeningOrder,FetchApiRequirementByStatus,FetchApiRequirementById, FetchApiRequirementByIdSecure}
