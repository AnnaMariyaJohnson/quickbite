import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { menuApi } from '../../api/menuApi';
import {
  RestaurantScreenProps,
  RootStackParamList,
} from '../../navigation/types';
import { useCartStore } from '../../store/cartStore';
import { MenuItem } from '../../types';

export default function RestaurantScreen({
  route,
}: RestaurantScreenProps) {
  const { restaurant } = route.params;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const addToCart = useCartStore(state => state.addToCart);

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const fetchMenu = useCallback(async () => {
    try {
      const data = await menuApi.getByRestaurantId(restaurant.id);
      setMenu(data || []);
    } catch (error) {
      console.error('Failed to load menu:', error);
      setMenu([]);
    } finally {
      setLoading(false);
    }
  }, [restaurant.id]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMenu();
    setRefreshing(false);
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        restaurantId: restaurant.id,
      },
      restaurant.id,
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">

      {/* HEADER IMAGE SECTION */}
      <View className="relative">
        <Image
          source={{ uri: restaurant.imageUrl }}
          className="w-full h-60"
          resizeMode="cover"
        />

        {/* Back Button Overlay */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-10 left-4 bg-black/60 p-2 rounded-full"
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Gradient overlay feel (simple dark layer) */}
        <View className="absolute bottom-0 left-0 right-0 h-20 bg-black/40" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF3D00']}
          />
        }
      >
        {/* RESTAURANT INFO */}
        <View className="px-4 pt-4">

          {/* Name + Rating */}
          <View className="flex-row justify-between items-start">
            <Text className="text-white text-3xl font-bold flex-1 pr-2">
              {restaurant.name}
            </Text>

            <View className="bg-green-600 px-3 py-1 rounded-lg">
              <Text className="text-white font-semibold">
                ⭐ {restaurant.rating}
              </Text>
            </View>
          </View>

          {/* Address */}
          <Text className="text-orange-400 mt-2">
            📍 {restaurant.address}
          </Text>

          {/* Description */}
          <Text className="text-zinc-400 mt-3 leading-5">
            {restaurant.description}
          </Text>

          {/* MENU TITLE */}
          <Text className="text-white text-2xl font-semibold mt-8 mb-4">
            Menu
          </Text>

          {/* MENU SECTION */}
          {loading ? (
            <View className="py-10 items-center">
              <ActivityIndicator color="#FF3D00" size="large" />
              <Text className="text-zinc-400 mt-3">Loading menu...</Text>
            </View>
          ) : menu.length === 0 ? (
            <Text className="text-zinc-400 text-center py-10">
              No menu items available
            </Text>
          ) : (
            menu.map(item => (
              <View
                key={item.id}
                className="bg-zinc-900 rounded-2xl p-4 mb-3 flex-row items-center"
              >
                {/* LEFT SIDE */}
                <View className="flex-1 pr-3">

                  {/* Name */}
                  <Text className="text-white text-lg font-semibold">
                    {item.name}
                  </Text>

                  {/* Description */}
                  {!!item.description && (
                    <Text className="text-zinc-400 mt-1" numberOfLines={2}>
                      {item.description}
                    </Text>
                  )}

                  {/* Price */}
                  <Text className="text-orange-500 font-bold text-xl mt-2">
                    ₹{item.price}
                  </Text>
                </View>

                {/* RIGHT BUTTON */}
                <TouchableOpacity
                  onPress={() => handleAddToCart(item)}
                  className="bg-orange-600 px-5 py-3 rounded-xl"
                >
                  <Text className="text-white font-semibold">
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}