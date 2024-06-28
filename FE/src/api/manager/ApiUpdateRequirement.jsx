import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader'
import { toast } from 'react-toastify'

const ApiUpdateRequirement = async ({ data: payload, id }) => {
   try {
      const response = await api.put(`/Requirement/${id}`, payload, axiosConfigHeader)
      toast.success('Update Success')
   } catch (error) {
      console.log('>>>Error', error)
   }
}

export default ApiUpdateRequirement;