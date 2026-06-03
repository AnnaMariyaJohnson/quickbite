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

    getByRestaurantId:async(restaurantId:string)=>{
        const response= await api.get(
            `/Menu/restaurant/${restaurantId}`
        );
        return response.data;
    }
}