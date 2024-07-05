import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader';

const PutApiMaterial = async ({ id, formData: payload }) => {
   try {

      const respone = await api.put(`/Material?id=${id}`, payload, axiosConfigHeader)

      return respone.data;

   } catch (error) {
      console.log('>>> Api Update Material ', error)
   }
}

export default PutApiMaterial;