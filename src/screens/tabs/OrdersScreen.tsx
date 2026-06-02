import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOrderStore } from '../../store/orderStore';

export default function OrdersScreen() {
  const orders = useOrderStore(state => state.orders);

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="px-4 pt-4">
        <Text className="text-white text-3xl font-bold">My Orders</Text>
      </View>

      <ScrollView className="flex-1 px-4 mt-6" showsVerticalScrollIndicator={false}>
       {orders.length===0 ?(
        <View className='flex-1 justify-center items-center mt-20'>
          <Text className='text-zinc-400 text-lg'>
            No orders yet
          </Text>
          <Text className='text-zinc-500 mt-2 text-center'>
            Your placed orders will appear here
          </Text>
        </View>        
       ):(
        <>
        <Text className='text-zinc-400 text-lg mb-4'>
          Order History
        </Text>
        {orders.map(order=>(
          <View
            key={order.id}
            className='bg-zinc-900 rounded-2xl p-4 mb-4'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-white font-semibold text-lg'>
                  {order.id}
                </Text>
                <Text className='text-orange-500 font-bold text-lg'>
                  ₹{order.total}
                </Text>
              </View>
              <Text className='text-zinc-400 mt-2'>
                Ordered on {order.date}
              </Text>
              <View className='mt-3'>
                <Text className='text-emerald-400'>
                  Delivered
                </Text>
              </View>
            </View>
        ))}
        </>
       )}
      </ScrollView>
    </SafeAreaView>
  );
}