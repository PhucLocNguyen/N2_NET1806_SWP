import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'
    

  const fetchApiUserRequirementByUserId = async (userId) => {
    try {
      const response = await api.get( `/UserRequirement?UsersId=${userId}`, axiosConfigHeader);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export { fetchApiUserRequirementByUserId }