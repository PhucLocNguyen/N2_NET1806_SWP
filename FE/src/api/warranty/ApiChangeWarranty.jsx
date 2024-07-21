import api from '../../api/instance';
import axiosConfigHeader from '../AxiosConfigHeader';
import { toast } from 'react-toastify';

const ApiAddWarranty = async ({ formData: payload }) => {
   try {

      const response = await api.post('/Have', payload, axiosConfigHeader);
      if (response.status == 200) {
         toast.success('Add warranty successfully')
      }

   } catch (error) {
      console.log(error)
      toast.error('Add warranty failure')
   }
}

const ApiGetWarrantyByRequirementId = async (id) => {
   try {

      const response = await api.get('/Have/GetAllWarrantyByRequirementId', {
         axiosConfigHeader,
         params: {
            requirementId: id
         }
      })
      return response.data

   } catch (error) {
      console.log('>>> Api Get Warranty By Requirement Id : ', error)
   }
}

export { ApiAddWarranty, ApiGetWarrantyByRequirementId }