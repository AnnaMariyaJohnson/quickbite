import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RestaurantCard from '../../components/restaurant/RestaurantCard' ;
import { restaurantApi } from '../../api/restaurantApi';
import {Restaurant} from '../../types/index';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function HomeScreen() {
  const [restaurants,setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing,setReferesing] = useState(false);

  useEffect(()=>{
    fetchRestaurants();
  },[]);

  const fetchRestaurants = async ()=>{
    try{
      const data = await restaurantApi.getAll();
      setRestaurants(data);
    }catch(error){
      console.error('Failed to fetch restaurants:',error);
    }finally{
      setLoading(false);
    }
  };

  const onRefersh= async()=>{
    setReferesing(true);
    await fetchRestaurants();
    setReferesing(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefersh} colors={['#FF3DOO']}/>
            }
       >
        {/* Header */}
        <View className="px-4 pt-4">
          <Text className="text-white text-3xl font-bold">QuickBite</Text>
          <Text className="text-zinc-400 text-lg">Good evening, Anna 👋</Text>
        </View>

        {/* Search Bar */}
        <View className="px-4 mt-6">
          <View className="bg-zinc-900 rounded-2xl px-4 py-3 flex-row items-center">
            <Icon name ="search" size={28} color='#71717a' />
            <Text className="text-zinc-400 ml-3">Search restaurants and dishes...</Text>
          </View>
        </View>

        {/* Categories */}
        <View className="px-4 mt-8">
          <Text className="text-white text-xl font-semibold mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {['Pizza', 'Burger', 'Biryani', 'Chinese', 'South Indian', 'Dessert'].map((cat, i) => (
              <TouchableOpacity 
                key={i} 
                className="bg-zinc-900 mr-3 px-5 py-3 rounded-2xl"
              >
                <Text className="text-white font-medium">{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Restaurants */}
        <View className="px-4 mt-8 mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Popular near you</Text>
            {loading ?(
              <Text className='text-zinc-400 text-center py-10'>Loading Restaurants...</Text>
            ):(
              restaurants.map((restaurant)=>(
            <RestaurantCard
              key={restaurant.id}
              id={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              time={restaurant.time}
              deliveryFee={restaurant.deliveryFee}/>
              ))
            )}
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}