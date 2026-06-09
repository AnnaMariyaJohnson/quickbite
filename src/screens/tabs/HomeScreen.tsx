// src/screens/tabs/HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { restaurantApi } from '../../api/restaurantApi';
import RestaurantCard from '../../components/restaurant/RestaurantCard';
import { RootStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { Restaurant } from '../../types/index';
import { menuApi } from '../../api/menuApi';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } =useAuthStore();
  
  useEffect(()=>{
    fetchRestaurants();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const data =
        await menuApi.getCategories();

      setCategories([
        'All',
        ...data,
      ]);
    } catch (error) {
      console.error(
        'Failed to load categories',
        error
      );
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        fetchRestaurants(),
        fetchCategories(),
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  const goToSearch = () => {
    navigation.navigate('Tabs', { screen: 'Search' });
  };

  const handleCategoryPress = async (category: string) =>
     {
      try {
        setSelectedCategory(category);

        if (category === 'All') {
          await fetchRestaurants();
          return;
        }

        const data =
          await restaurantApi.getByCategory(
            category
          );

        setRestaurants(data);

      } catch (error) {
        console.error(
          'Failed to filter restaurants',
          error
        );
      }
    };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FF3D00']} />}
      >
        {/* Header */}
        <View className="px-4 pt-4">
          <Text className="text-white text-3xl font-bold">QuickBite</Text>
          <Text className="text-zinc-400 text-lg">Good evening,{user?.name|| user?.email?.split('@')[0] ||'Guest'} 👋</Text>
        </View>

        {/* Clickable Search Bar */}
        <TouchableOpacity onPress={goToSearch} className="px-4 mt-6" activeOpacity={0.9}>
          <View className="bg-zinc-900 rounded-2xl px-4 py-3 flex-row items-center">
            <Icon name="search" size={28} color="#71717a" />
            <Text className="text-zinc-400 ml-3">Search restaurants and dishes...</Text>
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <View className="px-4 mt-8">
          <Text className="text-white text-xl font-semibold mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {categories.map((cat, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                handleCategoryPress(cat)
              }
              className={`mr-3 px-5 py-3 rounded-2xl ${
                selectedCategory === cat
                  ? 'bg-orange-600'
                  : 'bg-zinc-900'
              }`}
            >
              <Text className="text-white font-medium">
                {cat}
              </Text>
            </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Restaurants */}
        <View className="px-4 mt-8 mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Popular near you</Text>
          {loading ? (
            <Text className="text-zinc-400 text-center py-10">Loading Restaurants...</Text>
          ) : (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                address={restaurant.address}
                description={restaurant.description}
                imageUrl={restaurant.imageUrl}
                rating={restaurant.rating}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
