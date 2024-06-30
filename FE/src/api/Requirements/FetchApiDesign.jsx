import api from '../instance.jsx'


const FetchApiDesignById = async (id) => {
   try {
      const response = await api.get(`/Design/${id}`);
      const designDetail = response.data;
      return designDetail; // Directly return the data from the response
   } catch (error) {
      console.error(error);
      return {}; // Return an empty array or handle the error as needed
   }
}
export { FetchApiDesignById}
