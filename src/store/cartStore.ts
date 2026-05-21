import {create} from 'zustand';

export type CartItem={
    id:string;
    name:string;
    price:number;
    quantity:number;
    restaurantId:string;
    image?:string;
}

type cartStore={
    items:CartItem[];
    restaurantId:string | null;
    addToCart:(item:Omit<CartItem,'quantity'>,retaurantId:string)=>void;
    removeFromCart:(id:string)=>void;
    increaseQuantity:(id:string)=>void;
    decreaseQuantity:(id:string)=>void;
    clearCart:()=>void;
    totalItems:number;
};

export const useCartStore =create<cartStore>((set,get)=>({
    items:[],
    restaurantId:null,
    addToCart:(item,restaurantId)=>{
        const {items,restaurantId:currentRestId}=get();
        // clear cart if switching restaurant
        if(currentRestId && currentRestId !== restaurantId){
            set({items:[],restaurantId});
        }
        const existingIndex =items.findIndex(i=>i.id === item.id);
        if(existingIndex !== -1){
            const updatedItems =[...items];
            updatedItems[existingIndex].quantity += 1;
            set({items:updatedItems});
        }else{
            set({
                items:[...items, {...item,quantity:1}],
                restaurantId,
            });
        }
    },
    removeFromCart:(id)=>
        set((state)=>({
            items:state.items.filter((item)=>item.id !== id),
        })),
    increaseQuantity:(id)=>
        set((state)=>({
            items:state.items.map((item)=>
            item.id===id ? { ...item, quantity:item.quantity+1}:item),
        })),
    decreaseQuantity:(id)=>
        set((state)=>({
            items:state.items.map((item)=>
            item.id===id ?{ ...item,quantity:item.quantity -1}:item)
            .filter((item)=>item.quantity>0),
        })),
    clearCart:()=>set({items:[],restaurantId:null}),
    get totalItems(){
        return get().items.reduce((sum,item)=>sum+item.quantity,0);
    },
    get totalPrice(){
        return get().items.reduce((sum,item)=> sum + item.price * item.quantity,0);
    },

}));