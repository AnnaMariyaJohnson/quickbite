// src/screens/tabs/SearchScreen.tsx
import React, { useState, useEffect,useCallback } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { restaurantApi } from '../../api/restaurantApi';

import { MenuItem, Restaurant } from '../../types';
import Icon from 'react-native-vector-icons/MaterialIcons';

type SearchResult={
  type:'restaurant' | 'dish';
  restaurant:Restaurant;
  dish?:MenuItem;
};

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
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
      setSearchResults(
        data.map(r => ({
          type: 'restaurant',
          restaurant: r,
        }))
      );
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchRestaurants = useCallback(async () => {
    try {
      if (!searchText.trim()) {
        const data =
          await restaurantApi.getAll();

        setSearchResults(
          data.map(r => ({
            type: 'restaurant',
            restaurant: r,
          }))
        );

        return;
      }

      setSearching(true);

      const results =
        await restaurantApi.search(
          searchText
        );

      setSearchResults(results);
    } catch (error) {
      console.error(
        'Search failed:',
        error
      );
    } finally {
      setSearching(false);
    }
  }, [searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchRestaurants();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchRestaurants]);

  const handlePress = (
    result: SearchResult
  ) => {
    navigation.navigate(
      'Restaurant',
      {
        restaurant: {
          id: result.restaurant.id,
          name:
            result.restaurant.name,
          address:
            result.restaurant.address,
          description:
            result.restaurant
              .description,
          imageUrl:
            result.restaurant
              .imageUrl,
          rating:
            result.restaurant.rating,
        },
      }
    );
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 p-4"
      >
        {loading ? (
          <View className="flex-1 justify-center items-center mt-20">

            <ActivityIndicator
              size="large"
              color="#FF3D00"
            />

          </View>
        ) : (
          <>
            {searchResults.length ===
            0 ? (
              <View className="items-center py-20">

                <Icon
                  name="search-off"
                  size={80}
                  color="#3f3f46"
                />

                <Text className="text-white text-2xl font-semibold mt-6">
                  No results found
                </Text>

                <Text className="text-zinc-400 text-center mt-3">
                  Try different keywords
                </Text>
              </View>
            ) : (
              <>
                <Text className="text-zinc-400 mb-4 px-1">
                  {searchText
                    ? `Found ${searchResults.length} results`
                    : 'All Restaurants'}
                </Text>

                {searchResults.map(
                  (
                    result,
                    index
                  ) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        handlePress(
                          result
                        )
                      }
                      className="bg-zinc-900 rounded-3xl overflow-hidden mb-4"
                    >
                      <View className="p-4">

                        <View className="flex-row justify-between items-start">

                          <Text className="text-white text-lg font-semibold flex-1">
                            {
                              result
                                .restaurant
                                .name
                            }
                          </Text>

                        </View>

                        <Text
                          className="text-zinc-400 mt-1"
                          numberOfLines={2}
                        >
                          {
                            result
                              .restaurant
                              .description
                          }
                        </Text>

                        <Text className="text-zinc-500 mt-2">
                          {
                            result
                              .restaurant
                              .address
                          }
                        </Text>

                        {result.dish && (
                          <View className="mt-3 bg-zinc-800 rounded-xl p-3">

                            <Text className="text-orange-400 font-medium">
                              Matching Dish
                            </Text>

                            <Text className="text-white font-semibold mt-1">
                              {
                                result
                                  .dish
                                  .name
                              }
                            </Text>

                            <Text className="text-zinc-400">
                              {
                                result
                                  .dish
                                  .description
                              }
                            </Text>

                            <Text className="text-emerald-400 font-bold mt-1">
                              ₹
                              {
                                result
                                  .dish
                                  .price
                              }
                            </Text>

                          </View>
                        )}

                      </View>
                    </TouchableOpacity>
                  )
                )}

                {searching && (
                  <Text className="text-center text-zinc-400 py-4">
                    Searching...
                  </Text>
                )}
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}