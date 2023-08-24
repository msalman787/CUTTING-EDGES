import axios from 'axios';
import {BASE_URL} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('authenticated');
    if (jsonValue) {
      return jsonValue;
    }
    return null;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

const apiResponseGenerator = async ({method, url, body}: any) => {
  const authToken = await getAuthToken();
  const axiosConfig = {
    method: method ? method.toLowerCase() : 'get',
    url: `${BASE_URL}${url}`,
    data: body,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
    },
  };
  try {
    const response = await axios(axiosConfig);
    return response.data;
  }catch (error: any) {
    let errorMessage = '';
  
    if (Array.isArray(error?.response?.data?.message)) {
      errorMessage = error.response.data.message[0];
    } else if (typeof error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
  
    if (!!!errorMessage) {
      errorMessage = 'Unknown error occurred';
    }
  
    throw new Error(errorMessage);
  }
};

export default apiResponseGenerator;
