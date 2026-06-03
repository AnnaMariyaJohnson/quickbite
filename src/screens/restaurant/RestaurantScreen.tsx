import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import {
  RestaurantScreenProps,
  RootStackParamList,
} from '../../navigation/types';
import { menuApi } from '../../api/menuApi';
import { MenuItem } from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

  useEffect(() => {
    fetchMenu();
  }, [restaurant.id]);

  const fetchMenu = async () => {
    try {
      const data = await menuApi.getByRestaurantId(
        restaurant.id,
      );

      setMenu(data);
    } catch (error) {
      console.error('Failed to load menu:', error);
    } finally {
      setLoading(false);
    }
  };

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
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-zinc-800">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <Icon
            name="arrow-back"
            size={28}
            color="#ffffff"
          />
        </TouchableOpacity>

        <Text className="text-white text-xl font-semibold">
          Restaurant
        </Text>
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
        {/* Restaurant Info */}
        <View className="p-4">
          <Text className="text-white text-3xl font-bold">
            {restaurant.name}
          </Text>

          <Text className="text-zinc-400 mt-2">
            {restaurant.address}
          </Text>

          <Text className="text-zinc-300 mt-4">
            {restaurant.description}
          </Text>

          {/* Menu */}
          <Text className="text-white text-2xl font-semibold mt-8 mb-4">
            Menu
          </Text>

          {loading ? (
            <Text className="text-zinc-400 text-center py-12">
              Loading menu items...
            </Text>
          ) : menu.length === 0 ? (
            <Text className="text-zinc-400 text-center py-12">
              No menu items available
            </Text>
          ) : (
            menu.map(item => (
              <View
                key={item.id}
                className="bg-zinc-900 rounded-2xl p-4 mb-3 flex-row items-center"
              >
                <View className="flex-1">
                  <Text className="text-white text-lg font-semibold">
                    {item.name}
                  </Text>

                  {item.description ? (
                    <Text className="text-zinc-400 mt-1">
                      {item.description}
                    </Text>
                  ) : null}

                  <Text className="text-orange-500 font-bold text-xl mt-2">
                    ₹{item.price}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => handleAddToCart(item)}
                  className="bg-orange-600 px-6 py-3 rounded-xl"
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