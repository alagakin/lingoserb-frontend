import axios from 'axios';
import i18n from './i18n.js';


export const apiRequest = async (method, url, data, params) => {
  try {
    const response = await axios.request({
      method,
      url,
      data,
      params,
      headers: {
        'Accept-Language': i18n.global.locale,
        'Authorization': 'Token ' + localStorage.getItem('token'),
      }
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
      headers: {
        'Accept-Language': i18n.global.locale,
      }
    });
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
