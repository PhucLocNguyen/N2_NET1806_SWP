import api from "../instance.jsx";
import axiosConfigHeader from "../AxiosConfigHeader.jsx";

const PutApiRequirementByStatus = async (requirementId, dataUpdate) => {
  try {
    const response = await api.put(
      `/Requirement/${requirementId}`,
      dataUpdate,
      {
        ...axiosConfigHeader,
        headers: {
          'Content-Type': 'application/json', // Ensure Content-Type is set
          // Add any other headers required by your server
        },
      }
    );
    console.log('Data has been successfully updated:', response.data);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error in setting up the request:', error.message);
    }
  }
};

export { PutApiRequirementByStatus };
