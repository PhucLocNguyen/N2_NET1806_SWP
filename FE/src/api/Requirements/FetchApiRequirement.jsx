import { useState, useEffect } from 'react'
import api from '../instance.jsx'
import axiosConfigHeader from '../AxiosConfigHeader.jsx'

const fetchApiRequirement = async () => {
    try {
      const response = await api.get( "/Requirement", axiosConfigHeader);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchApiRequirementByStatus = async (status) => {
    try {
      const response = await api.get( `/Requirement?Status=${status}`, axiosConfigHeader);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const fetchApiRequirementByRequirementId = async (requirementId) => {
    try {
      const response = await api.get( `/Requirement/${requirementId}`, axiosConfigHeader);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
export { fetchApiRequirement,fetchApiRequirementByStatus,fetchApiRequirementByRequirementId }
