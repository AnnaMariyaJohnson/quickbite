import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="px-4 pt-4">
        <Text className="text-white text-3xl font-bold">My Orders</Text>
      </View>

      <ScrollView className="flex-1 px-4 mt-6" showsVerticalScrollIndicator={false}>
        {/* Active Order */}
        <View className="bg-zinc-900 rounded-3xl p-5 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-emerald-400 font-semibold">● On the way</Text>
            <Text className="text-white font-medium">ETA: 12 mins</Text>
          </View>
          <Text className="text-white text-lg font-semibold">Order #QB-7842</Text>
          <Text className="text-zinc-400">Meghana Foods • 2 items</Text>
          <Text className="text-zinc-500 mt-1">₹458 • Placed 25 mins ago</Text>
        </View>

        {/* Past Orders */}
        <Text className="text-zinc-400 text-lg mb-4">Past Orders</Text>

        {[1, 2, 3].map((_, i) => (
          <View key={i} className="bg-zinc-900 rounded-2xl p-4 mb-4">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-white font-medium">Domino's Pizza</Text>
                <Text className="text-zinc-400 text-sm">Margherita + Garlic Bread</Text>
              </View>
              <Text className="text-right text-zinc-400">₹289</Text>
            </View>
            <Text className="text-zinc-500 text-xs mt-3">Delivered on 15 May</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}