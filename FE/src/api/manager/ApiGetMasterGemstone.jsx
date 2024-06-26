import api from '../instance';
import axiosConfigHeader from '../AxiosConfigHeader';

const ApiGetMasterGemstone = async ({ pageSize, page }) => {
   try {

      const respone = await api.get('/MasterGemstone', {
         axiosConfigHeader,
         params: {
            pageIndex: page,
            pageSize: pageSize
         }
      })

      return respone.data;

   } catch (error) {
      console.log('>>> ApiGetMasterGemstone Error: ', error);
   }
}

export default ApiGetMasterGemstone;