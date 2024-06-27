import { useState, useEffect } from 'react';
import api from '../instance.jsx';
import axiosConfigHeader from '../AxiosConfigHeader.jsx';

const FetchApiBlog = async ({ pageSize, page }) => {
  try {
    const response = await api.get('/Blog', {
      headers: {
        ...axiosConfigHeader
      },
      params: {
        pageIndex: page,
        pageSize: pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { FetchApiBlog };
