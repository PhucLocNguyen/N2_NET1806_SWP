import api from '../instance';
import axiosConfigHeader from '../AxiosConfigHeader';

const ApiSaleOverview = async (year) => {
   try {

      const response = await api.get('/Dashboard/RevenueByYear', {
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

const ApiDashboardRevenueByDate = async (FromDate, ToDate) => {
   try {

      const response = await api.get('/Dashboard/RevenueByDate', {
         axiosConfigHeader,
         params: {
            FromDate: FromDate,
            ToDate: ToDate
         }
      })
      return response.data

   } catch (error) {
      console.log('>>> Api Dashboard Revenue By Date: ', error)
   }
}

export { ApiSaleOverview, ApiCountType, ApiDashboardMasterGemstone, ApiDashboardRevenueByDate }