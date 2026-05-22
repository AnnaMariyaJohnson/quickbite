import React from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from  '../../store/cartStore';
import { RestaurantScreenProps } from '../../navigation/types';

type MenuItem={
    id:string;
    name:string;
    price:number;
    description?:string;
    image?:string;
    isVeg?:boolean;
}

const mockMenu:MenuItem[]=[
    {
        id:'1',
        name:'Butter Chicken',
        price:289,
        description:'Tender chicken in rich tomato gravy',
        isVeg:false,
    },
    {
        id:'2',
        name:'Panner Butter Masala',
        price:259,
        description:'Cottage cheese in creamy gravy',
        isVeg:true,
    },
    {
    id: '3',
    name: 'Hyderabadi Biryani',
    price: 349,
    description: 'Fragrant basmati rice with spices and meat',
    isVeg: false,
  },
  {
    id: '4',
    name: 'Veg Fried Rice',
    price: 199,
    description: 'Stir fried rice with vegetables and soy sauce',
    isVeg: true,
  },
];

export default function RestaurantScreen({route}:RestaurantScreenProps){
    const { restaurant } = route.params;
    const addToCart=useCartStore((state)=>state.addToCart);
    const cartItems=useCartStore((state)=>state.items);

    const handleAddToCart=(item:MenuItem)=>{
        addToCart(
            {
                id:item.id,
                name:item.name,
                price:item.price,
                restaurantId:restaurant.id,
                image:item.image|| restaurant.image,
            },
            restaurant.id
        );
        setTimeout(()=>{
            console.log('cart after add:',useCartStore.getState().items);
        },100);
    };
    return(
        <SafeAreaView className='flex-1 bg-zinc-950'>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/*Restaurant header image */}
                <Image
                    source={{uri:restaurant.image}}
                    className='w-full h-56'
                    resizeMode='cover'
                    />
                    <View className='p-4'>
                        {/* Restaurant info */}
                        <Text className='text-white text-3xl font-bold'>{restaurant.name}</Text>
                        <Text className='text-zinc-400 text-lg mt-1'>{restaurant.cuisine}</Text>

                        <View className='flex-row items- center mt-3 gap-4'>
                            <View className='bg-green-600 px-3 py-1 rounded-lg flex-row items-center'>
                                <Text className='text-white text-sm font-bold'>⭐{restaurant.rating}</Text>
                            </View>
                            <Text className='text-emerald-400 font-medium'>{restaurant.time}</Text>
                            <Text className='text-zinc-500'>•</Text>
                            <Text className='text-emerald-400 font-medium'>{restaurant.deliveryFee}</Text>
                        </View>

                        {/*Menu section*/}
                        <Text className='text-white text-2xl font-semibold mt-8 mb-4'>Menu</Text>
                        {mockMenu.map((item)=>(
                            <View
                                key={item.id}
                                className='bg-zinc-900 rounded-2xl p-4 flex-row items-center'>
                                    <View className='flex-1'>
                                        <View className='flex-row items-center gap-2'>
                                            <Text className='text-lg'>{item.isVeg ? '🟢' : '🔴'}</Text>
                                            <Text className='text-white text-lg font-semibold flex-1'>{item.name}</Text>
                                        </View>
                                        <Text className='text-zinc-400 text-sm mt-1'>{item.description}</Text>
                                        <Text className='text-white font-bold text-xl mt-2'>₹{item.price}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={()=>handleAddToCart(item)}
                                        className='bg-orange-600 px-8 py-3 rounded-xl'
                                        activeOpacity={0.8}>
                                            <Text className='text-white font-semibold'>Add</Text>
                                    </TouchableOpacity>
                            </View>
                        ))}
                    </View>
            </ScrollView>

            <View className="absolute bottom-20 right-4 bg-black/70 px-4 py-2 rounded-full">
                <Text className="text-white">Cart Items: {cartItems.length}</Text>
            </View>
        </SafeAreaView>
    )
}