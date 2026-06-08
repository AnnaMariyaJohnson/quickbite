import { Order } from '../types/order';
import api from './axios';

export interface CreateOrderRequest {
    totalAmount:number;
    addressId:string;
    deliveryAddress:string;
}

export const orderApi={
    createOrder:async(data:CreateOrderRequest):Promise<Order>=>{
        const response=await api.post('/Orders',data);
        return response.data;
    },

    getOrders:async():Promise<Order[]>=>{
        const response=await api.get('/Orders/my-orders');
        return response.data;
    },

    getOrderById:async(id:string):Promise<Order>=>{
        const response=await api.get(`/Orders/${id}`);
        return response.data;
    },
}