import { useState, useEffect } from 'react'
import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'

const FetchApiDesign = async () => {
  try {
    const response = await api.get("/Design", axiosConfigHeader);
    return response.data
  } catch (error) {
    console.error(error);
    return [];
  }
};

const FetchApiDesignByDesignId = async (designId) => {
    try {
      const response = await api.get(`/Design/${designId}`, axiosConfigHeader);
      return response.data
    } catch (error) {
      console.error(error);
      return [];
    }
  };


export { FetchApiDesign,FetchApiDesignByDesignId }
