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
export { PostPaymentApi, VerifyPaymentApi}