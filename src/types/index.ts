//src/types/index.ts
 export interface Restaurant{
    id:string;
    name:string;
    image:string;
    cuisine:string;
    rating:number;
    time:string;
    deliveryFee: string | number;
 }

 export interface MenuItem{
    id:string;
    restaurantId:string;
    name:string;
    description?:string;
    price:number;
    image?:string;
    isVeg?:boolean;
    category?:string;
 }

 export interface CartItem extends MenuItem{
    quantity:number;
 }

 export interface User{
    id:string;
    name:string;
    email:string;
    phone?:string;
    address?:Address[];
 }

 export interface Address{
    type:'Home' | 'Work' | 'Other';
    address:string;
    city:string;
    pincode:string;
 }