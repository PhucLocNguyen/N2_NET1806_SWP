import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader'

const ApiCreateMasterGemstone = async ({ formData: payload}) => {
   try {
      const respone = await api.post('/MasterGemstone', payload, axiosConfigHeader);

      return respone.data;
   } catch (error) {
      console.log('>>> Api Create Master Gemstone Error: ', error)
   }
}

export default ApiCreateMasterGemstone;

