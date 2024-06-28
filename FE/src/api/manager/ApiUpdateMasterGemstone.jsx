import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader';

const ApiUpdateMasterGemstone = async ({ id, formData: payload }) => {
   try {

      const respone = await api.put(`/MasterGemstone/${id}`, payload, axiosConfigHeader)

      return respone.data;

   } catch (error) {
      console.log('>>> Api Update Master Gemstone ', error)
   }
}

export default ApiUpdateMasterGemstone;