import {create} from 'zustand';
import {Order} from '../types/order';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type OrderState={
    orders:Order[];
    setOrders:(order:Order[])=>void;
    addOrder:(order:Order)=>void;
}

export const useOrderStore=create<OrderState>()(
    persist((set)=>({
    orders:[],
    setOrders:(orders)=>
        set({orders}),
    addOrder:(order)=>
        set((state)=>({
            orders:[order,...state.orders],
        })),
}),
{
    name:'order-storage',
    storage:createJSONStorage(()=>AsyncStorage),
})
);