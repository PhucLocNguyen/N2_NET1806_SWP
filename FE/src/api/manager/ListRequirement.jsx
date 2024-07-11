import api from "../instance";
import axiosConfigHeader from "../AxiosConfigHeader";

const ApiListRequirement = async ({ pageSize, page, status }) => {
  try {
    const response = await api.get("/Requirement", {
      axiosConfigHeader,
      params: {
        pageIndex: page,
        pageSize: pageSize,
        Status: status,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default ApiListRequirement;
