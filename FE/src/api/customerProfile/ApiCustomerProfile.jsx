import api from '../../api/instance';
import axiosConfigHeader from '../AxiosConfigHeader';
import { toast } from 'react-toastify';

const ApiGetUser = async (payload) => {
   try {

      const response = await api.post('/User/GetUserId', payload, axiosConfigHeader);
      return response.data

   } catch (error) {
      console.log('>>> Api Get User : ', error)
   }
}

const ApiUpdateProfile = async ({ UserId, formData: payload }) => {
   try {

      const response = await api.put('/User', payload, {
         axiosConfigHeader,
         params: {
            userId: UserId
         }
      })
      toast.success('Update successful');

   } catch (error) {
      console.log('>>> Api Update Profile : ', error)
      toast.error('Update failed');
   }
}

export { ApiGetUser, ApiUpdateProfile }