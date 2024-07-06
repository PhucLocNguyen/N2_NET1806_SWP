import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader'

const PostApiBlog = async ({ formData: payload}) => {
   try {
      const respone = await api.post('/Blog', payload, axiosConfigHeader);
      return respone.data;
   } catch (error) {
      console.log('>>> Api Create Blog Error: ', error)
   }
}

export default PostApiBlog;

