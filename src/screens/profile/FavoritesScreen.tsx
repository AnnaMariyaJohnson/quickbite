import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { SafeAreaView }
from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  FavoriteRestaurant,
  FavoriteMenuItem,
} from '../../types/favorite';

import { favoriteApi }
from '../../api/favoriteApi';

import { useAuthStore }
from '../../store/authStore';

export default function FavoritesScreen({
  navigation,
}: any) {
  const user = useAuthStore(
    state => state.user,
  );

  const [activeTab, setActiveTab] =
    useState<'restaurants' | 'menuitems'>(
      'restaurants',
    );

  const [
    restaurants,
    setRestaurants,
  ] = useState<FavoriteRestaurant[]>(
    [],
  );

  const [
    menuItems,
    setMenuItems,
  ] = useState<FavoriteMenuItem[]>(
    [],
  );

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const restaurantData =
        await favoriteApi.getFavoriteRestaurants(
          user.id,
        );

      const menuData =
        await favoriteApi.getFavoriteMenuItems(
          user.id,
        );

      setRestaurants(restaurantData);
      setMenuItems(menuData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">

      <View className="flex-row items-center px-4 py-4 border-b border-zinc-800">

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }>
          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold ml-4">
          Favorites
        </Text>
      </View>

      <View className="flex-row m-4 bg-zinc-900 rounded-xl">

        <TouchableOpacity
          onPress={() =>
            setActiveTab('restaurants')
          }
          className={`flex-1 py-3 rounded-xl ${
            activeTab === 'restaurants'
              ? 'bg-orange-600'
              : ''
          }`}>
          <Text className="text-white text-center">
            Restaurants
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setActiveTab('menuitems')
          }
          className={`flex-1 py-3 rounded-xl ${
            activeTab === 'menuitems'
              ? 'bg-orange-600'
              : ''
          }`}>
          <Text className="text-white text-center">
            Menu Items
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'restaurants' ? (
        <FlatList
          data={restaurants}
          keyExtractor={item =>
            item.favoriteId
          }
          renderItem={({ item }) => (
            <View className="bg-zinc-900 m-4 p-4 rounded-xl">

              <Image
                source={{
                  uri: item.imageUrl,
                }}
                className="h-40 rounded-xl"
              />

              <Text className="text-white text-xl mt-3">
                {item.name}
              </Text>

              <Text className="text-zinc-400">
                {item.address}
              </Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={item =>
            item.favoriteId
          }
          renderItem={({ item }) => (
            <View className="bg-zinc-900 m-4 p-4 rounded-xl">

              <Text className="text-white text-lg">
                {item.name}
              </Text>

              <Text className="text-zinc-400 mt-2">
                {item.description}
              </Text>

              <Text className="text-orange-500 mt-2 text-lg">
                ₹{item.price}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}