import api from '../instance';
import axiosConfigHeader from '../AxiosConfigHeader';
import { toast } from 'react-toastify';

const ApiGetAllStaff = async ({ pageSize, page }) => {
   try {

      const response = await api.get('/User', {
         axiosConfigHeader,
         params: {
            pageIndex: page,
            pageSize: pageSize,
         }
      })
      return response.data

   } catch (error) {
      console.log(error)
   }
}

const ApiModifyStaff = async ({ payload, id }) => {
   try {

      const response = await api.patch('/User/ModifyAccount', payload, {
         axiosConfigHeader,
         params: {
            userId: id
         }
      })
      toast.success('Create success')

   } catch (error) {
      console.log('Api Modify Staff Error: ', error)
      toast.error('Create failure')
   }
}

export { ApiGetAllStaff, ApiModifyStaff }