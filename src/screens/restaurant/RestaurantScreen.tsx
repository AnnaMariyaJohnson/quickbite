import React, { useEffect, useState } from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from  '../../store/cartStore';
import { RestaurantScreenProps } from '../../navigation/types';
import {restaurantApi} from '../../api/restaurantApi';
import {MenuItem} from '../../types/index';




export default function RestaurantScreen({route}:RestaurantScreenProps){
    const { restaurant } = route.params;
    const addToCart=useCartStore((state)=>state.addToCart);
    const cartItems=useCartStore((state)=>state.items);

    const [menu,setMenu] = useState<MenuItem[]>([]);
    const[loading,setLoading] = useState(true);

    //Fetch menu when screen loads
    useEffect(()=>{
        fetchMenu();
    },[restaurant.id]);

    const fetchMenu= async()=>{
        try{
            const data=await restaurantApi.getMenu(restaurant.id);
            setMenu(data);
        }catch(error){
            console.error('Failed to load menu:',error);
        }finally{
            setLoading(false);
        }
    };

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
                        {loading ?(
                            <Text className='text-zinc-400 text-center py-12'>Loading menu items...</Text>
                        ):menu.length===0?(
                            <Text className='text-zinc-400 text-center py-12'>No menu items available</Text>
                        ):(
                            menu.map((item)=>(
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
                        )))}
                    </View>
            </ScrollView>

            <View className="absolute bottom-20 right-4 bg-black/70 px-4 py-2 rounded-full">
                <Text className="text-white">Cart Items: {cartItems.length}</Text>
            </View>
        </SafeAreaView>
    )
}