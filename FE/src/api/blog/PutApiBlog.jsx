import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader';

const PutApiBlog = async ({ id, formData: payload }) => {
   try {

      const respone = await api.put(`/Blog?id=${id}`, payload, axiosConfigHeader)

      return respone.data;

   } catch (error) {
      console.log('>>> Api Update Blog ', error)
   }
}

export default PutApiBlog;