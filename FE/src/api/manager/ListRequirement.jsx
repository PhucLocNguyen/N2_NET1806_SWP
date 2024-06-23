import api from '../instance'

const ApiListRequirement = async ({ accessToken, pageSize, page, status }) => {

   try {
      const response = await api.get('/Requirement', {
         headers: {
            'Authorization': `Bearer ${accessToken}`
         },
         params: {
            pageIndex: page,
            pageSize: pageSize,
            Status: status
         }
      })

      return response.data;

   } catch (error) {
      console.log(error)
   }
}

export default ApiListRequirement;