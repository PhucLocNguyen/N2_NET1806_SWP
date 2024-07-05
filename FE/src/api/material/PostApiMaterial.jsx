import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader'

const PostApiMaterial = async ({ formData: payload}) => {
   try {
      const respone = await api.post('/Material', payload, axiosConfigHeader);
      return respone.data;
   } catch (error) {
      console.log('>>> Api Create Material Error: ', error)
   }
}

export default PostApiMaterial;

