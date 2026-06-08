// src/api/axios.ts
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

console.log('API URL:', API_BASE_URL);
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL || 'http://10.60.210.130:5215/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async(config:InternalAxiosRequestConfig)=>{
   const token = await AsyncStorage.getItem('authToken');
    if(token){
      config.headers.Authorization=`Bearer ${token}`;
    }
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;