import api from "../instance.jsx";
import axiosConfigHeader from "../AxiosConfigHeader.jsx";

const FetchApiBlog = async ({ pageSize, page }) => {
  try {
    const response = await api.get("/Blog", {
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

const FetchApiBlogById= async (id) => {
  try {
     const response = await api.get(`/Blog/${id}`);
     return response.data; 
  } catch (error) {
     console.error(error);
     return []; 
  }
}

export { FetchApiBlog, FetchApiBlogById };
