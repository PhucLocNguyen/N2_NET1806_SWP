import api from '../instance'

const ApiListRequirement = async (accessToken, pageSize, page) => {
   try {
      const response = await api.get('/Requirement', {
         headers: {
            'Authorization': `Bearer ${accessToken}`
         },
         params: {
            pageIndex: page,
            pageSize: pageSize
         }
      })

      return response.data;

   } catch (error) {
      console.log(error)
   }
}

export default ApiListRequirement;