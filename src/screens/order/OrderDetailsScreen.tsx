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
    
    const formatDate=(date?:string)=>{
      if(!date)return "Unknown date";
      const parsed =new Date(date);
      if(isNaN(parsed.getTime()))
        return "Unknown date";
      return parsed.toDateString();
    }
    
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
            {formatDate(order.createdAt)}
          </Text>

          <Text className="text-zinc-400 mt-4">
            User ID
          </Text>

          <Text className="text-white">
            {order.userId}
          </Text>
        </View>

        <View className="bg-zinc-900 rounded-2xl p-4 mt-4">
          <Text className="text-white text-xl font-bold">
            Total: ₹{order.totalAmount}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}