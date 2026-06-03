import React from 'react';
import { View, Text, ScrollView,  TouchableOpacity,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CartScreen() {
  const { items, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-zinc-950">
        <View className="flex-1 justify-center items-center px-6">
          <Icon name="shopping-cart" size={90} color="#3f3f46" />
          <Text className="text-white text-3xl font-semibold mt-8">Your cart is empty</Text>
          <Text className="text-zinc-400 text-center text-lg mt-3">
            Add some delicious items from restaurants
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Tabs', { screen: 'Home' })}
            className="bg-orange-600 px-10 py-4 rounded-2xl mt-10 w-full max-w-[300px]"
          >
            <Text className="text-white font-semibold text-xl text-center">
              Browse Restaurants
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Cart with Items
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="p-5 border-b border-zinc-800">
          <Text className="text-white text-3xl font-bold">Cart</Text>
          <Text className="text-zinc-400 mt-1">{totalItems} items</Text>
        </View>

        {/* Cart Items */}
        <View className="p-4 space-y-4">
          {items.map((item) => (
            <View
              key={item.id}
              className="bg-zinc-900 rounded-3xl p-4 flex-row"
            >

              {/* Details */}
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold">{item.name}</Text>
                <Text className="text-orange-500 font-bold text-2xl mt-1">₹{item.price}</Text>

                {/* Quantity Controls */}
                <View className="flex-row items-center mt-4 bg-zinc-800 rounded-2xl p-1 w-fit">
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    className="w-10 h-10 items-center justify-center"
                  >
                    <Text className="text-white text-2xl font-bold text-orange-400">-</Text>
                  </TouchableOpacity>
                  <Text className="text-white font-semibold text-xl px-6">{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    className="w-10 h-10 items-center justify-center"
                  >
                    <Text className="text-white text-2xl font-bold text-orange-400">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Delete Button */}
              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                className="p-2 -mt-1"
              >
                <Icon name="delete-outline" size={26} color="#ef4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Summary */}
      <View className="bg-zinc-900 border-t border-zinc-700 p-5">
        <View className="flex-row justify-between items-center mb-5">
          <Text className="text-zinc-400 text-xl">Total</Text>
          <Text className="text-white text-3xl font-bold">₹{totalPrice}</Text>
        </View>

        <TouchableOpacity
          className="bg-orange-600 py-4 rounded-2xl items-center"
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Checkout');
          }}
        >
          <Text className="text-white font-semibold text-xl">Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}