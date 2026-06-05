import api from './axios';
import {Address} from '../types/address';

export const addressApi={
    getByUserId:async (userId:string):Promise<Address[]> =>{
        const response=await api.get(`/Addresses/user/${userId}`);
        return response.data;
    },

    getById:async (id:string):Promise<Address>=>{
        const response=await api.get(`/Addresses/${id}`);
        return response.data;
    },

    create:async (address:Omit<Address,'id'>) => {
        const response=await api.post('/Addresses',address);
        return response.data;
    },
    
    update:async(id:string,address:Address)=>{
        const response=await api.put(`/Addresses/${id}`,address);
        return response.data;
    },

    delete:async(id:string)=>{
        const response =await api.delete(`/Addresses/${id}`);
        return response.data;
    },
};