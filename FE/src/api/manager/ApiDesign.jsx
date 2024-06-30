import api from '../instance';
import axiosConfigHeader from '../AxiosConfigHeader';

import { toast } from 'react-toastify';

const ApiGetParentDesign = async ({ pageSize, page }) => {
   try {

      const response = await api.get('/Design', {
         axiosConfigHeader,
         params: {
            pageIndex: page,
            pageSize: pageSize
         }
      })
      console.log(response.data)
      return response.data

   } catch (error) {
      console.log('>>>Api Parent Design Error: ', error)
   }
}

const ApigGetTypeOfJewellery = async () => {
   try {

      const response = await api.get('/TypeOfJewellery', axiosConfigHeader);
      return response.data;

   } catch (error) {
      console.log('>>>Api Get Type Of Jewellery : ', error)
   }
}

const ApiCreateParentDesign = async ({ payload }) => {
   try {

      const response = await api.post('/Design/DesignParent', payload, axiosConfigHeader)
      toast.success('Create success');
      return response?.data;

   } catch (error) {
      console.log('>>> Api Create Design Parent Error : ', error);
      toast.error('Create failure');
   }
}

const ApiDeleteParentDesign = async (id) => {
   try {

      const response = await api.delete('/Design', {
         axiosConfigHeader,
         params: {
            id: id
         }
      })

      if (response?.status == 200) {
         toast.success('Deleted successfully');
      }

   } catch (error) {
      console.log('>>> Api Delete Design Parent Error : ', error);
      toast.error('Delete failure');
   }
}

const ApiUpdateParentDesign = async ({ id, payload }) => {
   try {

      const response = await api.put('/Design', payload, {
         axiosConfigHeader,
         params: {
            id: id
         }
      })

      if (response?.status == 200) {
         toast.success('Update successful');
      }

   } catch (error) {
      console.log('>>> Api Update Parent Design Error: ', error);
      toast.error('Update failed');
   }
}

export { ApiGetParentDesign, ApigGetTypeOfJewellery, ApiCreateParentDesign, ApiDeleteParentDesign, ApiUpdateParentDesign }