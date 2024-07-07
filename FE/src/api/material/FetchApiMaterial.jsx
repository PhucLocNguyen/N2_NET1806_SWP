import api from "../instance.jsx";
import axiosConfigHeader from "../AxiosConfigHeader.jsx";

const FetchApiMaterial = async ({ pageSize, page }) => {
  try {
    const response = await api.get("/Material", {
      headers: {
        ...axiosConfigHeader,
      },
      params: {
        pageIndex: page,
        pageSize: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const FetchApiMaterialById= async (id) => {
  try {
     const response = await api.get(`/Material/${id}`);
     return response.data; 
  } catch (error) {
     console.error(error);
     return []; 
  }
}

export { FetchApiMaterial, FetchApiMaterialById };
