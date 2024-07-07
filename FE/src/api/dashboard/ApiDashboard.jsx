import api from '../instance';
import axiosConfigHeader from '../AxiosConfigHeader';

const ApiSaleOverview = async (year) => {
   try {

      const response = await api.get('/Dashboard/Revenue', {
         axiosConfigHeader,
         params: {
            year: year
         }
      })
      return response.data

   } catch (error) {
      console.log(error)
   }
}

const ApiCountType = async (month, year) => {
   try {

      const response = await api.get('/Dashboard/CountType', {
         axiosConfigHeader,
         params: {
            monthFromRequest: month,
            year: year
         }
      })
      return response.data

   } catch (error) {
      console.log(error)
   }
}

const ApiDashboardMasterGemstone = async () => {
   try {

      const response = await api.get('/Dashboard/MostMasterGemstone')
      return response.data

   } catch (error) {
      console.log(error)
   }
}

export { ApiSaleOverview, ApiCountType, ApiDashboardMasterGemstone }