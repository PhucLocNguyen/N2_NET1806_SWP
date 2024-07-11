import api from '../instance';
import axiosConfigHeader from '../AxiosConfigHeader';
import { toast } from 'react-toastify';

const ApiGetStone = async ({ pageSize, page }) => {

   try {

      const response = await api.get('/Stones', {
         axiosConfigHeader,
         params: {
            pageIndex: page,
            pageSize: pageSize
         }
      });
      return response.data;

   } catch (error) {
      console.log('>>>API Get Stone : ', error)
   }

}

const ApiCreateStone = async ({ formData: payload }) => {
   try {

      const response = await api.post('/Stones', payload, axiosConfigHeader);
      toast.success('Create success');

   } catch (error) {
      console.log('>>>API Create Stone : ', error)
      toast.error('Data already exists');
   }
}

const ApiUpdateStone = async ({ id, formData: payload }) => {
   try {

      const response = await api.put('/Stones', payload, {
         axiosConfigHeader,
         params: {
            id: id
         }
      });
      toast.success('Update Success');

   } catch (error) {
      console.log('>>> Api Update Stone : ', error)
   }
}

const ApiDeleteStone = async (id) => {
   try {

      const response = await api.delete('/Stones', {
         axiosConfigHeader,
         params: {
            id: id
         }
      })
      if (response?.status == 200) {
         toast.success('Deleted successfully');
      }

   } catch (error) {
      console.log('>>> Api Delete Stone : ', error)
      toast.error('Delete failure');
   }
}

export { ApiGetStone, ApiCreateStone, ApiUpdateStone, ApiDeleteStone };