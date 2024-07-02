import api from '../instance'
import axiosConfigHeader from '../AxiosConfigHeader';

const ApiRequirementById = async (id) => {

   try {

      const respone = await api.get(`/Requirement/${id}`, axiosConfigHeader);

      return respone.data

   } catch (error) {
      console.log(error)
   }

}

export default ApiRequirementById;