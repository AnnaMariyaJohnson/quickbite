import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RestaurantCard from '../../components/restaurant/RestaurantCard' ;
import {COLORS} from '../../constants/colors';

const mockRestaurants=[
  {
    id: '1',
    name: 'Meghana Foods',
    image: 'https://picsum.photos/id/1080/600/300',
    cuisine: 'Biryani • North Indian • ₹₹',
    rating: 4.6,
    time: '25-30 mins',
    deliveryFee: 'Free delivery',
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: 'https://picsum.photos/id/201/600/300',
    cuisine: 'Pizza • Italian • ₹₹',
    rating: 4.3,
    time: '20-25 mins',
    deliveryFee: '₹30 delivery',
  },
]

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-4">
          <Text className="text-white text-3xl font-bold">QuickBite</Text>
          <Text className="text-zinc-400 text-lg">Good evening, Anna 👋</Text>
        </View>

        {/* Search Bar */}
        <View className="px-4 mt-6">
          <View className="bg-zinc-900 rounded-2xl px-4 py-3 flex-row items-center">
            <Text className="text-zinc-500">🔍</Text>
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
          {mockRestaurants.map((restaurant)=>(
            <RestaurantCard
              id={restaurant.id}
              name={restaurant.name}
              image={restaurant.image}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              time={restaurant.time}
              deliveryFee={restaurant.deliveryFee}/>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}