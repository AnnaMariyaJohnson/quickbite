import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { authApi } from '../api/authApi';
import api from '../api/axios';

type User={
    id:string;
    name:string;
    email:string;
    phone?:string;
}

//custom error type for better error handling
type ApiError={
    message?:string;
    status?:number;
    response?:{
        data?:{
            message?:string;
        }
    }
}

type AuthState={
    user:User |null;
    token:string|null;
    isLoading:boolean;
    isAuthenticated:boolean;
    login:(email:string,password:string)=>Promise<void>;
   // register:(name:string,email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;
    loadStoredUser:()=>Promise<void>;   
};

export const useAuthStore=create<AuthState>((set)=>({
    user:null,
    token:null,
    isLoading:true,
    isAuthenticated:false,

    login:async(email:string,password:string)=>{
        try{
            const loginResponse=await authApi.login(
                email,
                password,
            );
            const token=loginResponse.token;
            await AsyncStorage.setItem('authToken',token);

            api.defaults.headers.common.Authorization=`Bearer ${token}`;

            const meResponse=await api.get('/auth/me');
            const user:User={
                id:meResponse.data.userId,
                name:meResponse.data.fullName,
                email:meResponse.data.email,
            };
            set({
                user,
                token,
                isAuthenticated:true,
            });
        }catch(error){
            console.error('Login failed:',error);
            throw error;
        }
    },

    // login: async (email: string, password: string) => {
    //     const user = {
    //         id: "1",
    //         name: "Test User",
    //         email,
    //     };

    //     const token = "mock_token";

    //     await AsyncStorage.setItem("authToken", token);

    //     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    //     set({
    //         user,
    //         token,
    //         isAuthenticated: true,
    //     });
    //     },

    logout:async()=>{
        try{
            await AsyncStorage.removeItem('authToken');
            delete api.defaults.headers.common.Authorization;
        }catch(e){
            console.warn('Error clearing token:',e);
        } finally{
            set({
                user:null,
                token:null,
                isAuthenticated:false,
            });
        }
        },
        
    loadStoredUser:async()=>{
        try{
            const token=await AsyncStorage.getItem('authToken');
            if(!token){
                set({isLoading:false});
                return;
            }
            api.defaults.headers.common.Authorization=`Bearer ${token}`;
            const response=await api.get('/auth/me');
            const  user:User={
                id:response.data.userId,
                name:response.data.fullName,
                email:response.data.email,
            };
            set({
                user,
                token,
                isAuthenticated:true,
            });
        }catch(error){
            const err= error as ApiError;
            console.error('Failed to load User',err.response?.data || err.message);
            await AsyncStorage.removeItem('authToken');
            set({
                user:null,
                token:null,
                isAuthenticated:false,
            });
        }finally{
            set({isLoading:false});
        }
    }
        
    
}));