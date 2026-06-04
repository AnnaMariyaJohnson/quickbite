import api from '../api/axios';
import { UserProfile,UpdateProfileRequest } from '../types/user';

export const userApi={
    getProfile:async():Promise<UserProfile>=>{
        const response=await api.get('/User/profile')
        return response.data;
    },

    updateProfile:async(
        data:UpdateProfileRequest,
    )=>{
        const response=await api.put('/User/profile', data);
        return response.data;
    }
};