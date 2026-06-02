import api from './axios';

export const menuApi={
    getByRestaurantId:async(restaurnatId:string)=>{
        const response= await api.get(
            `/menu/restaurant/${restaurnatId}`
        );
        return response.data;
    }
}