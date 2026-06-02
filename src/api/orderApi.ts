import api from './axios';
import { Order } from '../types/order';

export const orderApi={
    createOrder:async(order:Order)=>{
        const response=await api.post('/order',order);
        return response.data;
    },

    getOrders:async():Promise<Order[]>=>{
        const response=await api.get('/order');
        return response.data;
    }
}