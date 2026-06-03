import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import {orderApi} from '../../api/orderApi';
import React,{ useEffect, useState } from 'react';
import { useOrderStore } from '../../store/orderStore';

export default function OrdersScreen() {
  const orders = useOrderStore(state => state.orders);
  const setOrders = useOrderStore(state => state.setOrders);
  const [loading,setLoading]=useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(()=>{
    loadOrders();
  },[]);

  const loadOrders=async()=>{
    try{
      const data=await orderApi.getOrders();
      setOrders(data);
    } catch(error){
      console.error('Failed to load orders:',error);
    }finally{
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-zinc-950 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-white mt-4">
          Loading orders...
        </Text>
      </SafeAreaView>
    );
  }

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
          <TouchableOpacity
            key={order.id}
            onPress={() => navigation.navigate('OrderDetails', 
              { orderId: order.id ,
              })
            }
            className='bg-zinc-900 rounded-2xl p-4 mb-4'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-white font-semibold text-lg'>
                  {order.id}
                </Text>
                <Text className='text-orange-500 font-bold text-lg'>
                  ₹{order.totalAmount}
                </Text>
              </View>
              <Text className='text-zinc-400 mt-2'>
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </Text>
              <View className='mt-3'>
                <Text className='text-orange-400'>
                  Order Placed
                </Text>
              </View>
            </TouchableOpacity>
        ))}
        </>
       )}
      </ScrollView>
    </SafeAreaView>
  );
}