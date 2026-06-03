import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {RouteProp, useRoute } from '@react-navigation/native';
import { useOrderStore } from '../../store/orderStore';
import { RootStackParamList } from '@/navigation/types';

type OrderDetailsRouteProp=RouteProp<
    RootStackParamList,
    'OrderDetails'
>;

export default function OrderDetailsScreen(){
    const route=useRoute<OrderDetailsRouteProp>();
    const {orderId}=route.params;
    const order=useOrderStore(state=>
        state.orders.find(o=>o.id===orderId));
    
        if(!order){
            return(
                <SafeAreaView className="flex-1 bg-zinc-950 justify-center items-center">
                    <Text className="text-white text-xl">
                    Order not found
                    </Text>
                </SafeAreaView>
            );
        }

        return(
             <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView className="p-4">

        <Text className="text-white text-3xl font-bold">
          Order Details
        </Text>

        <View className="bg-zinc-900 rounded-2xl p-4 mt-6">
          <Text className="text-zinc-400">
            Order ID
          </Text>

          <Text className="text-white text-lg font-semibold">
            {order.id}
          </Text>

          <Text className="text-zinc-400 mt-4">
            Date
          </Text>

          <Text className="text-white">
            {order.date}
          </Text>

          <Text className="text-zinc-400 mt-4">
            Status
          </Text>

          <Text className="text-emerald-400">
            {order.status || 'Delivered'}
          </Text>
        </View>

        <Text className="text-white text-xl font-semibold mt-6 mb-3">
          Items
        </Text>

        {order.items.map(item => (
          <View
            key={item.id}
            className="bg-zinc-900 rounded-2xl p-4 mb-3"
          >
            <Text className="text-white font-semibold">
              {item.name}
            </Text>

            <Text className="text-zinc-400">
              Qty: {item.quantity}
            </Text>

            <Text className="text-orange-500">
              ₹{item.price}
            </Text>
          </View>
        ))}

        <View className="bg-zinc-900 rounded-2xl p-4 mt-4">
          <Text className="text-white text-xl font-bold">
            Total: ₹{order.total}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}