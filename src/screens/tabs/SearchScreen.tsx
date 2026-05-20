import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="px-4 pt-4">
        <Text className="text-white text-3xl font-bold mb-6">Search</Text>

        {/* Search Input */}
        <View className="bg-zinc-900 rounded-2xl flex-row items-center px-4 py-3">
          <Text className="text-xl mr-3">🔍</Text>
          <TextInput
            className="flex-1 text-white text-base"
            placeholder="Search restaurants or dishes..."
            placeholderTextColor="#71717a"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 mt-6" showsVerticalScrollIndicator={false}>
        {/* Recent Searches */}
        <Text className="text-zinc-400 text-lg mb-3">Recent Searches</Text>
        {['Butter Chicken', 'Veg Biryani', 'Pizza Margherita', 'Masala Dosa'].map((item, i) => (
          <TouchableOpacity key={i} className="py-4 border-b border-zinc-800">
            <Text className="text-zinc-300 text-base">{item}</Text>
          </TouchableOpacity>
        ))}

        {/* Popular Cuisines */}
        <Text className="text-white text-xl font-semibold mt-8 mb-4">Popular Cuisines</Text>
        <View className="flex-row flex-wrap gap-3">
          {['North Indian', 'South Indian', 'Chinese', 'Italian', 'Mexican', 'Desserts'].map((cuisine, i) => (
            <TouchableOpacity key={i} className="bg-zinc-900 px-6 py-3 rounded-2xl">
              <Text className="text-white font-medium">{cuisine}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}