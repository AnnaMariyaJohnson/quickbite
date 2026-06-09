import api from './axios';
import {Restaurant} from '../types/index';

export const restaurantApi={
    getAll:async():Promise<Restaurant[]>=>{
      const response=await api.get('/Restaurant');
      return response.data;
    },
    getById:async(id:string):Promise<Restaurant>=>{
      const response=await api.get(`/Restaurant/${id}`);
      return response.data;
    },
    search:async(query:string)=>{
      const response=await api.get(`/Restaurant/search-all?query=${query}`);
      return response.data;
    }
}