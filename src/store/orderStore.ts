import {create} from 'zustand';
import { CartItem } from './cartStore';

type Order={
    id:string;
    total:number;
    date:string;
    items:CartItem[];
};

type OrderState={
    orders:Order[];
    addOrder:(order:Order)=>void;
}

export const useOrderStore=create<OrderState>((set)=>({
    orders:[],
    addOrder:(order)=>
        set((state)=>({
            orders:[order,...state.orders],
        }))
}));