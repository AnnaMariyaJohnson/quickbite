export interface FavoriteRestaurant{
    favoriteId:string;
    restaurantId:string;
    name:string;
    imageUrl:string;
    rating:number;
    address:string;
}

export interface FavoriteMenuItem{
    favoriteId:string;
    menuItemId:string;
    name:string;
    description:string;
    price:string;
    imageUrl?:string;
}

export interface CreateFavoriteRequest{
    userId:string;
    restaurantId?:string;
    menuItemId?:string;
}