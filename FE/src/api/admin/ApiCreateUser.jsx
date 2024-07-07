import api from '../instance';
import axiosConfigHeader from '../AxiosConfigHeader';
import { toast } from 'react-toastify';

const ApiCreateUser = async ({ formData: payload, accessToken }) => {

   try {

      let response = await api.post('/User/registerForAdmin', payload, {
         axiosConfigHeader,
         params: {
            roleEnum: `${payload.role}`
         }
      })
      toast.success('Create success')

   } catch (error) {
      console.log('>>> Error Api Create User: ', error)
      toast.error('Create failure')
   }

}

export default ApiCreateUser;