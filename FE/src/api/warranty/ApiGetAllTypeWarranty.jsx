import api from '../../api/instance';
import axiosConfigHeader from '../AxiosConfigHeader';

const ApiGetAllTypeWarranty = async () => {
   try {

      const response = await api.get('/WarrantyCard', axiosConfigHeader);
      return response.data

   } catch (error) {
      console.log('>>> Api Get All Type Warranty Error : ', error)
   }
}

export default ApiGetAllTypeWarranty;

