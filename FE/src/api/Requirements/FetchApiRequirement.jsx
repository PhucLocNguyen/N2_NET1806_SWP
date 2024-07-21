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
const FetchApiRequirementHaveUserWithStatus = async (status, UserId)=>{
   try {
      const response = await api.get(`/Requirement/GetRequirementByRole`,{axiosConfigHeader,params:{
         userId:UserId,
         status: status
      }});
      const requirementById = response.data;
      return requirementById; 
   } catch (error) {
      console.error(error);
      return null; 
   }
}

const FetchSummaryPriceByRequirementId= async (id) => {
   try {
      const response = await api.get(`/Requirement/PriceOfRequirement?requirementId=${id}`, axiosConfigHeader);
      const summaryPrice = response.data;
      return summaryPrice; 
   } catch (error) {
      console.error(error);
      return null; 
   }
}

const FetchRequirementWaitingPay= async ({page, pageSize}) => {
   try {
      const response = await api.get(`/Requirement/requirementWaitingToPay`, {
         axiosConfigHeader,
         params: {
            pageIndex: page,
            pageSize: pageSize,
         }
      });
      const requirementData = response.data;
      return requirementData; 
   } catch (error) {
      console.error(error);
      return null; 
   }
}
export { FetchApiRequirementOpeningOrder,FetchApiRequirementByStatus,FetchApiRequirementById, FetchApiRequirementByIdSecure, FetchApiRequirementHaveUserWithStatus, FetchSummaryPriceByRequirementId, FetchRequirementWaitingPay}
