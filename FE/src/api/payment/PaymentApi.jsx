import { toast } from 'react-toastify';
import axiosConfigHeader from '../AxiosConfigHeader.jsx';
import api from '../instance.jsx'


const PostPaymentApi = async (formData) => {
   try {
      const response = await api.post(`/Vnpay`, formData);
      const paymentResponseUrl = response.data;
      return paymentResponseUrl; // Directly return the data from the response
   } catch (error) {
      console.error(error);
      return {}; // Return an empty array or handle the error as needed
   }
}
const VerifyPaymentApi = async (queryString) => {
   try{
      const response = await api.get(`/Vnpay/CheckResponse?${queryString}`, axiosConfigHeader);
      const data = response.data;
      const dataVerify = {
         requirementId: data,
         isFailed: false
      };
      return dataVerify;
   }catch(e){
      console.error(e);
      const dataVerify = {
         requirementId: e.response.data,
         isFailed: true
      };
      return dataVerify;
   }
}
const FetchPaymentApiByRequirementId = async (requirementId) => {
   try {
      const response = await api.get(`/Payment/GetAllPaymentByRequirementId?requirementId=${requirementId}`, axiosConfigHeader);
      const paymentResponseUrl = response.data;
      return paymentResponseUrl; // Directly return the data from the response
   } catch (error) {
      console.error(error);
      return []; // Return an empty array or handle the error as needed
   }
}
const PostPaymentByStaff = async (formData,successMessage, failedMessage) => {
   try {
      const response = await api.post(`/Payment`, formData);
      const paymentResponse = response.data;
      toast.success(successMessage);
      return paymentResponse; 
   } catch (error) {
      console.error(error);
      toast.error(failedMessage);
      return null; 
   }
}
export { PostPaymentApi, VerifyPaymentApi, FetchPaymentApiByRequirementId, PostPaymentByStaff}
