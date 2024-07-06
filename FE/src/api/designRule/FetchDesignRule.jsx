import api from "../instance";
import axiosConfigHeader from "../AxiosConfigHeader";

const FetchDesignRuleById = async ({ id }) => {
  try {
    const response = await api.get(`/DesignRule/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const FetchDesignRule = async ({ pageSize, page }) => {
  try {
    const response = await api.get("/DesignRule", {
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

export { FetchDesignRule, FetchDesignRuleById };
