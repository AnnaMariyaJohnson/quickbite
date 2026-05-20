import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center pt-10 pb-8 bg-zinc-900">
          <View className="w-24 h-24 bg-zinc-700 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">👩‍🍳</Text>
          </View>
          <Text className="text-white text-2xl font-bold">Anna Mariya</Text>
          <Text className="text-zinc-400">anna@example.com</Text>
        </View>

        <View className="px-4 mt-6">
          {/* Menu Items */}
          {[
            { title: 'My Addresses', icon: '📍' },
            { title: 'Payment Methods', icon: '💳' },
            { title: 'Favorites', icon: '❤️' },
            { title: 'Order History', icon: '📜' },
            { title: 'Notifications', icon: '🛎️' },
            { title: 'Help & Support', icon: '❓' },
            { title: 'Dark Mode', icon: '🌙' },
          ].map((item, i) => (
            <TouchableOpacity key={i} className="flex-row items-center py-5 border-b border-zinc-800">
              <Text className="text-2xl mr-4">{item.icon}</Text>
              <Text className="text-white text-lg flex-1">{item.title}</Text>
              <Text className="text-zinc-500 text-xl">›</Text>
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity className="mt-10 py-4">
            <Text className="text-red-500 text-center text-lg font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}