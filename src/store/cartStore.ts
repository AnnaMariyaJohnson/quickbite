import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem={
    id:string;
    name:string;
    price:number;
    quantity:number;
    restaurantId:string;
    image?:string;
}

type CartStore={
    items:CartItem[];
    restaurantId:string | null;
    addToCart:(item:Omit<CartItem,'quantity'>,restaurantId:string)=>void;
    removeFromCart:(id:string)=>void;
    increaseQuantity:(id:string)=>void;
    decreaseQuantity:(id:string)=>void;
    clearCart:()=>void;
    totalItems:number;
    totalPrice:number;
};

export const useCartStore=create<CartStore>()(
    persist((set,get)=>({
    items:[],
    restaurantId:null,
    totalItems:0,
    totalPrice:0,

    addToCart:(item,restaurantId)=>{
        const {items,restaurantId:currentRestId}=get();

        //clear cart if switching restaurant
        if(currentRestId && currentRestId !== restaurantId){
            set({items:[],restaurantId});
        }

        const existingItem=items.findIndex(i=>i.id===item.id);

        let newItems:CartItem[];
        if(existingItem !== -1){
          newItems=[...items];
            newItems[existingItem].quantity +=1;
        }else{
            newItems=[...items,{...item,quantity:1}];
        }  
        const newTotalItems=newItems.reduce((sum,i)=>sum+i.quantity,0);
        const newTotalPrice=newItems.reduce((sum,i)=>sum+i.price*i.quantity,0);

        set({
            items:newItems,
            restaurantId,
            totalItems:newTotalItems,
            totalPrice:newTotalPrice,
        });
    },
    removeFromCart:(id)=>{
        const newItems=get().items.filter(i=>i.id!==id);
        const newTotalItems=newItems.reduce((sum,i)=>sum+i.quantity,0);
        const newTotalPrice=newItems.reduce((sum,i)=>sum+i.price*i.quantity,0);

        set({
            items:newItems,
            totalItems:newTotalItems,
            totalPrice:newTotalPrice,
        });
    },
    decreaseQuantity:(id)=>{
        const newItems=get().items.map(item=>
            item.id === id ? {...item,quantity:item.quantity-1} : item
        ).filter(i=>i.quantity>0);

        const newTotalItems=newItems.reduce((sum,i)=>sum+i.quantity,0);
        const newTotalPrice=newItems.reduce((sum,i)=>sum+i.price*i.quantity,0);

        set({
            items:newItems,
            totalItems:newTotalItems,
            totalPrice:newTotalPrice,
        });
    },
    increaseQuantity:(id)=>{
        const newItems=get().items.map(item=>
            item.id === id ? {...item,quantity:item.quantity+1} : item
        );

        const newTotalItems=newItems.reduce((sum,i)=>sum+i.quantity,0);
        const newTotalPrice=newItems.reduce((sum,i)=>sum+i.price*i.quantity,0);

        set({
            items:newItems,
            totalItems:newTotalItems,
            totalPrice:newTotalPrice,
        });
    },
    clearCart:()=>{
        set({
            items:[],
            restaurantId:null,
            totalItems:0,
            totalPrice:0,
        });
    },
        }),{
            name:'cart-storage',
            storage:createJSONStorage(()=>AsyncStorage),
        }
    )
);
