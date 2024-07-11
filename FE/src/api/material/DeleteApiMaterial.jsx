import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader'
import { toast } from 'react-toastify'

const DeleteApiMaterial= async (id) => {

   try {
      const respone = await api.delete('/Material', {
         axiosConfigHeader,
         params: {
            id: id
         }
      })
      console.log('>>>Delete success', respone)
      if (respone?.status == 200) {
         toast.success('Deleted successfully');
      }
   } catch (error) {
      console.log('>>>Api delete Material: ', error?.response?.data)
      if (error?.response?.data == 'Cannot delete this item because it is referenced by another entity') {
         toast.error('Data in use cannot be deleted');
      }
   }

}

export default DeleteApiMaterial;