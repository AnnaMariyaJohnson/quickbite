// src/screens/tabs/SearchScreen.tsx
import React, { useState, useEffect, use } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { restaurantApi } from '../../api/restaurantApi';
import { MenuItem, Restaurant } from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { resourceLimits } from 'node:worker_threads';

type SearchResult={
  type:'restaurant' | 'dish';
  restaurant:Restaurant;
  dish?:MenuItem;
};

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [menus,setMenus]=useState<Record<string,MenuItem[]>>({});
  const [searchResults,setSearchResults]=useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching,setSearching]=useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await restaurantApi.getAll();
      setRestaurants(data);
      setSearchResults(data.map(r=>({
        type:'restaurant',
        restaurant:r
      })));
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResults(restaurants.map(r=>({
        type:'restaurant',restaurant:r
      })));
      return;
    }

    const query=searchText.toLowerCase().trim();
    const results:SearchResult[]=[];
    const processedRestaurants=new Set<string>();

    restaurants.forEach(restaurant=>{
      let matched=false;
      if(
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query)
      ){
        results.push({type:'restaurant',restaurant});
        matched=true;
        processedRestaurants.add(restaurant.id);
      }
      // Search in menu items 
      const restaurantMenu=menus[restaurant.id];
      if(restaurantMenu){
        restaurantMenu.forEach(dish=>{
          if(
            dish.name.toLowerCase().includes(query)||
            (dish.description && dish.description.toLowerCase().includes(query))
          ){
            results.push({
              type:'dish',
              restaurant,
              dish
            });
            matched=true;
          }
        })
      }    
    });
    setSearchResults(results);
  }, [searchText, restaurants,menus]);

  //Fetch menu when user starts searching for dishes
  const fetchMenuForRestaurant=async(restaurantId:string)=>{
    if(menus[restaurantId]) return; //Already fetched
    try{
      setSearching(true);
      const menuItems=await restaurantApi.getMenu(restaurantId);
      setMenus(prev=>({...prev,[restaurantId]:menuItems}));
    } catch (error) {
      console.error('Failed to fetch menu for restaurant:', error);
    } finally {
      setSearching(false);
    }
  }

  useEffect(()=>{
    if(searchText.trim().length<2) return;
    const timer=setTimeout(()=>{
      restaurants.forEach(r=>fetchMenuForRestaurant(r.id));
    },300);
    return()=>clearTimeout(timer);
  },[searchText])

  const handlePress = (result: SearchResult) => {
    navigation.navigate('Restaurant', { restaurant:result.restaurant });
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      {/* Search Bar */}
      <View className="p-4 border-b border-zinc-800">
        <View className="flex-row items-center bg-zinc-900 rounded-2xl px-4 py-3">
          <Icon name="search" size={24} color="#71717a" />
          <TextInput
            className="flex-1 ml-3 text-white text-base"
            placeholder="Search restaurants and dishes..."
            placeholderTextColor="#71717a"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="close" size={24} color="#71717a" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-4">
        {loading ? (
          <View className="flex-1 justify-center items-center mt-20">
            <ActivityIndicator size="large" color="#FF3D00" />
          </View>
        ) : (
          <>
            {searchResults.length === 0 ? (
              <View className="items-center py-20">
                <Icon name="search-off" size={80} color="#3f3f46" />
                <Text className="text-white text-2xl font-semibold mt-6">No results found</Text>
                <Text className="text-zinc-400 text-center mt-3">Try different keywords</Text>
              </View>
            ) : (
              <>
                <Text className="text-zinc-400 mb-4 px-1">
                  {searchText ? `Found ${searchResults.length} results` : 'All Restaurants'}
                </Text>

                {searchResults.map((result, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(result)}
                    className="bg-zinc-900 rounded-3xl overflow-hidden mb-4 active:opacity-90"
                  >
                    <Image
                      source={{ uri: result.restaurant.image }}
                      className="w-full h-48"
                      resizeMode="cover"
                    />
                    <View className="p-4">
                      <View className="flex-row justify-between items-start">
                        <Text className="text-white text-lg font-semibold flex-1">
                          {result.restaurant.name}
                        </Text>
                        <View className="bg-green-600 px-2 py-0.5 rounded flex-row items-center">
                          <Text className="text-white text-xs font-bold">⭐ {result.restaurant.rating}</Text>
                        </View>
                      </View>
                      <Text className="text-zinc-400 mt-1">{result.restaurant.cuisine}</Text>

                        {/* Show matched dish if any */}
                    {result.dish && (
                      <View className="mt-2 bg-zinc-800 rounded-xl p-3">
                        <Text className="text-orange-400 font-medium">Matching Dish:</Text>
                        <Text className="text-white font-semibold">{result.dish.name}</Text>
                        <Text className="text-emerald-400">₹{result.dish.price}</Text>
                      </View>
                    )}
                      <View className="flex-row items-center mt-3">
                        <Text className="text-emerald-400 text-sm">{result.restaurant.time}</Text>
                        <Text className="text-zinc-500 mx-2">•</Text>
                        <Text className="text-emerald-400 text-sm">{result.restaurant.deliveryFee}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                {searching && (
              <Text className="text-center text-zinc-400 py-4">Searching dishes...</Text>
            )}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}