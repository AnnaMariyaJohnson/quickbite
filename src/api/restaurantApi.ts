import { Restaurant,MenuItem } from "../types/index";
import api from './axios';

//Mock data('we'll replace this later with real API calls)
const mockRestaurants:Restaurant[]=[
    {
    id: '1',
    name: 'Meghana Foods',
    image: 'https://picsum.photos/id/1080/600/300',
    cuisine: 'Biryani • North Indian • ₹₹',
    rating: 4.6,
    time: '25-30 mins',
    deliveryFee: 'Free delivery',
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: 'https://picsum.photos/id/201/600/300',
    cuisine: 'Pizza • Italian • ₹₹',
    rating: 4.3,
    time: '20-25 mins',
    deliveryFee: '₹30 delivery',
  },
];

const mockMenus:Record<string,MenuItem[]>={
    '1':[
        {
      id: '1',
      restaurantId: '1',
      name: 'Butter Chicken',
      price: 289,
      description: 'Tender chicken in rich tomato gravy',
      isVeg: false,
    },
    {
      id: '2',
      restaurantId: '1',
      name: 'Paneer Butter Masala',
      price: 259,
      description: 'Cottage cheese in creamy gravy',
      isVeg: true,
    },
    {
      id: '3',
      restaurantId: '1',
      name: 'Hyderabadi Biryani',
      price: 349,
      description: 'Fragrant basmati rice with spices and meat',
      isVeg: false,
    },
    {
      id: '4',
      restaurantId: '1',
      name: 'Veg Fried Rice',
      price: 199,
      description: 'Stir fried rice with vegetables and soy sauce',
      isVeg: true,
    },
  ],
  '2': [
    {
      id: '5',
      restaurantId: '2',
      name: 'Margherita Pizza',
      price: 249,
      description: 'Classic cheese pizza with fresh basil',
      isVeg: true,
    },
    {
      id: '6',
      restaurantId: '2',
      name: 'Pepperoni Pizza',
      price: 329,
      description: 'Spicy pepperoni with mozzarella cheese',
      isVeg: false,
    },
    {
      id: '7',
      restaurantId: '2',
      name: 'Garlic Bread',
      price: 149,
      description: 'Crispy garlic bread with cheese',
      isVeg: true,
    },
    {
      id: '8',
      restaurantId: '2',
      name: 'Veg Pasta',
      price: 219,
      description: 'Penne pasta in creamy tomato sauce',
      isVeg: true,
    },
  ],
}

export const restaurantApi={
    getAll:async():Promise<Restaurant[]>=>{
        //simulate network delay
        await new Promise(resolve=>setTimeout(resolve,800));
        return mockRestaurants;
    },
    // getAll:async()=>{
    //   const response=await api.get('/restaurant');
    //   return response.data;
    // },
    getById:async(id:string)=>{
      const response=await api.get(`/restaurant/${id}`);
      return response.data;
    },

    getMenu:async(restaurantId:string):Promise<MenuItem[]>=>{
        await new Promise(resolve=>setTimeout(resolve,600));
        return mockMenus[restaurantId] || [];
    }
}