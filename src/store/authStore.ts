import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const useAuthStore=create<AuthState>((set,get)=>({
    user:null,
    token:null,
    isLoading:true,
    isAuthenticated:false,

    // login:async(email:string,password:string)=>{
    //     try{
    //         const response=await api.post('/auth/login',{email,password});
    //         const {token,user}=response.data;
    //         await AsyncStorage.setItem('authToken',token);
    //         api.defaults.headers.common['Authorization']=`Bearer ${token}`;
    //         set({
    //             user,
    //             token,
    //             isAuthenticated:true,
    //         });
    //     } catch(error){
    //         const err= error as ApiError;
    //         console.error('Login Error:',err.response?.data || err.message);
    //         throw err;
    //     }
    // },

        // TODO:
    // Replace mock login with authApi.login()
    // after verifying backend response.
    // === MOCK LOGIN HANDLER (Temporary) ===
   login: async (email: string, password: string) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay

        // Mock user with better name handling
        const mockUser: User = {
        id: 'user_' + Date.now().toString(),
        name: email.includes('@') 
            ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) 
            : 'User',
        email: email.toLowerCase(),
        phone: '9876543210',
        };

        const mockToken = 'mock-jwt-token-' + Date.now();

        await AsyncStorage.setItem('authToken', mockToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;

        set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        });
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
    },
    logout:async()=>{
        try{
            await AsyncStorage.removeItem('authToken');
            delete api.defaults.headers.common['Authorization'];
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
            api.defaults.headers.common['Authorization']=`Bearer ${token}`;
            const response=await api.get('/auth/me');
            set({
                user:response.data,
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