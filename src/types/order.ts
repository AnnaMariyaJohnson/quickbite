export interface Order {
    id:string;
    total:number;
    date:string;
    items:{
        id:string;
        name:string;
        quantity:number;
        price:number;
    }[];
}