import api from './axios';
import { 
    FavoriteRestaurant,
    FavoriteMenuItem,
    CreateFavoriteRequest } from '../types/favorite';

export const favoriteApi={
    getFavoriteRestaurants:async(
        userId:string,
    ):Promise<FavoriteRestaurant[]>=>{
        const response=await api.get(`/Favorites/restaurants/${userId}`);
        return response.data;
    },

    getFavoriteMenuItems:async(
        userId:string,
    ):Promise<FavoriteMenuItem[]>=>{
        const response=await api.get(`/Favorites/menuItems/${userId}`);
        return response.data;
    },

    addFavorite:async(
        data:CreateFavoriteRequest,
    )=>{
        const response=await api.post('/Favorites',data);
        return response.data;
    },

    removeFavorite:async(
        favoriteId:string,
    )=>{
        const response=await api.delete(`/Favorites/${favoriteId}`);
        return response.data;
    }

}