import api from '../instance'

const ApiRequirementById = async (id, accessToken) => {

   try {

      const respone = await api.get(`/Requirement/${id}`, {
         headers: {
            'Authorization': `Bearer ${accessToken}`
         }
      });

      return respone.data

   } catch (error) {
      console.log(error)
   }

}

export default ApiRequirementById;