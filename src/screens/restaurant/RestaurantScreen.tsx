import React, { useEffect, useState } from 'react';
import {View,Text,ScrollView,Image,TouchableOpacity, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from  '../../store/cartStore';
import { RestaurantScreenProps, RootStackParamList } from '../../navigation/types';
import {restaurantApi} from '../../api/restaurantApi';
import {MenuItem} from '../../types/index';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export default function RestaurantScreen({route}:RestaurantScreenProps){
    const { restaurant } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const addToCart=useCartStore((state)=>state.addToCart);
    const cartItems=useCartStore((state)=>state.items);

    const [menu,setMenu] = useState<MenuItem[]>([]);
    const[loading,setLoading] = useState(true);
    const[refreshing ,setRefreshing]=useState(false);

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

    const onRefresh=async () =>{
        setRefreshing(true);
        await fetchMenu();
        setRefreshing(false);
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
            {/* Custom Header */}
      <View className="flex-row items-center  px-4 py-4 bg-zinc-950 border-b border-zinc-800">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2"
        >
          <Icon name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>        
        <Text className="text-white text-xl font-semibold">Restaurant</Text>        
      </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#FF3D00']}
                />
            }>
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
                                            <Icon
                                                name={item.isVeg ? "eco" : "whatshot"}
                                                size={22}
                                                color={item.isVeg ? "#22c55e" : "#ef4444"}
                                                />
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
        </SafeAreaView>
    )
}