import { useState, useEffect } from 'react'
import api from '../instance.jsx'


const FetchApiDesignRuleById = async (id) => {
   try {
      const response = await api.get(`/DesignRule?TypeOfJewelleryId=${id}`);
      const designRuleById = response.data;
      return designRuleById[0]; // Directly return the data from the response
   } catch (error) {
      console.error(error);
      return {}; // Return an empty array or handle the error as needed
   }
}
export { FetchApiDesignRuleById}
