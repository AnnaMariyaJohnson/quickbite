import api from './axios';

export const authApi={
    login:async (email:string,password:string)=>{
        const response=await api.post('/auth/login',{
            email,
            password
        });
        return response.data;
    },

    register:async(
        fullName:string,
        email:string,
        password:string
    )=>{
        const response=await api.post('/auth/register',{
            fullName,
            email,
            password,
        });
        return response.data;
    }
}