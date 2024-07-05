import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader';

const PutApiDesignRule = async ({ id, formData: payload }) => {
   try {

      const respone = await api.put(`/DesignRule?id=${id}`, payload, axiosConfigHeader)

      return respone.data;

   } catch (error) {
      console.log('>>> Api Update Design Rule ', error)
   }
}

export default PutApiDesignRule;