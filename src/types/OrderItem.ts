export interface OrderItem{
    id:string;
    menuItemId:string;
    quantity:number;
    price:number;
    menuItem?:{
        name:string;
        imageUrl:string;
    }
}