import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader'

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

export { ApiGetParentDesign }