import axios from 'axios';
import i18n from './i18n.js';

const instance = axios.create({
  headers: {
    'Accept-Language': i18n.global.locale,
    'Authorization': 'Token ' + localStorage.getItem('token'),
  }
});

export const apiRequest = async (method, url, data, params) => {
  try {
    const response = await instance.request({
      method,
      url,
      data,
      params
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export const apiLogin = async (url, data) => {
  try {
    const response = await axios.request({
      method: "POST",
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
