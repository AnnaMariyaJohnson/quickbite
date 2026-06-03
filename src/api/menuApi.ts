import api from './axios';

export const menuApi={
    getAll:async()=>{
        const response=await api.get('/Menu');
        return response.data;
    },

    getById:async(id:string)=>{
        const response=await api.get(`/Menu/${id}`);
        return response.data;
    },

    getByRestaurantId:async(restaurnatId:string)=>{
        const response= await api.get(
            `/Menu/restaurant/${restaurnatId}`
        );
        return response.data;
    }
}