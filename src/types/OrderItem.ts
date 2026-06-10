export interface OrderItem{
    id:string;
    menuItemId:string;
    quantity:number;
    price:number;
    menuItemName?:string;
    menuItemImage?:string;
}