import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/types';
import {orderApi} from '../../api/orderApi';
import { RefreshControl } from 'react-native';
import {Order} from '../../types/order';

type OrderDetailsRouteProp = RouteProp<
  RootStackParamList,
  'OrderDetails'
>;

export default function OrderDetailsScreen() {
  const route =
    useRoute<OrderDetailsRouteProp>();
  const navigation = useNavigation();
  const { orderId } = route.params;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing]=useState(false);

  const formatDate = (
    date?: string,
  ) => {
    if (!date) {
      return 'Unknown date';
    }

  const parsed = new Date(date);
    if (
      isNaN(parsed.getTime())
    ) {
      return 'Unknown date';
    }
    return parsed.toDateString();
  };
  
    const onRefresh=async()=>{
      setRefreshing(true);
      await loadOrder();
      setRefreshing(false);
    };
  
   const loadOrder=async()=>{
      try{
        const data=await orderApi.getOrderById(orderId);
        setOrder(data);
      }catch(error){
        console.error(error);
      }finally{
        setLoading(false);
      }
    };

    useEffect(()=>{
      loadOrder();
    },[]);

    useEffect(()=>{
      const interval =setInterval(()=>{
        loadOrder();
      },10000);
      return ()=>clearInterval(interval);
    },[]);

  if(loading){
    return(
      <SafeAreaView className='flex-1 bg-zinc-950 justify-center items-center'>
        <Text className='text-white'>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-zinc-950 justify-center items-center">
        <Text className="text-white text-xl">
          Order not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView 
      className="p-4"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#f97316']}/>
      }>

        {/* Header */}
        <View className="flex-row items-center mb-6">

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Icon
              name="arrow-back"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <Text className="text-white text-3xl font-bold ml-4">
            Order Details
          </Text>

        </View>

        {/* Order Info */}
        <View className="bg-zinc-900 rounded-2xl p-5">

          <Text className="text-zinc-400">
            Order ID
          </Text>

          <Text
            className="text-white text-lg font-semibold mt-1"
            numberOfLines={1}
          >
            {order.id}
          </Text>

          <Text className="text-zinc-400 mt-5">
            Date
          </Text>


          <Text className="text-white mt-1">
            {formatDate(
              order.createdAt,
            )}
          </Text>

          <Text className="text-zinc-400 mt-4">
            Delivery Address
          </Text>

          <Text className="text-white leading-6">
            {order.deliveryAddress?.replace(/,\s*/g, '\n')}
          </Text>

          <Text className="text-zinc-400 mt-5">
            User ID
          </Text>

          <Text
            className="text-white mt-1"
            numberOfLines={1}
          >
            {order.userId}
          </Text>

        </View>

        {/* Order Tracking */}
        <View className="bg-zinc-900 rounded-2xl p-5 mt-4">
          <Text className="text-white text-lg font-bold mb-5">
            Order Tracking
          </Text>

          {/* Order Placed */}
          <View className="flex-row items-center mb-4">
            <Icon
              name="check-circle"
              size={22}
              color={
                ['OrderPlaced', 'Preparing', 'OutForDelivery', 'Delivered']
                  .includes(order.status)
                  ? '#22C55E'
                  : '#52525B'
              }
            />
            <Text className="text-white ml-3">
              Order Placed
            </Text>
          </View>

          {/* Preparing */}
          <View className="flex-row items-center mb-4">
            <Icon
              name="restaurant"
              size={22}
              color={
                ['Preparing', 'OutForDelivery', 'Delivered']
                  .includes(order.status)
                  ? '#22C55E'
                  : '#52525B'
              }
            />
            <Text className="text-white ml-3">
              Preparing Food
            </Text>
          </View>

          {/* Out For Delivery */}
          <View className="flex-row items-center mb-4">
            <Icon
              name="delivery-dining"
              size={22}
              color={
                ['OutForDelivery', 'Delivered']
                  .includes(order.status)
                  ? '#22C55E'
                  : '#52525B'
              }
            />
            <Text className="text-white ml-3">
              Out For Delivery
            </Text>
          </View>

          {/* Delivered */}
          <View className="flex-row items-center">
            <Icon
              name="home"
              size={22}
              color={
                order.status === 'Delivered'
                  ? '#22C55E'
                  : '#52525B'
              }
            />
            <Text className="text-white ml-3">
              Delivered
            </Text>
          </View>

        </View>

        {/* Ordered Items */}
        <View className="bg-zinc-900 rounded-2xl p-5 mt-4">
          <Text className="text-white text-lg font-bold mb-4">
            Ordered Items
          </Text>

         {order.orderItems?.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center mb-3"
          >
            <View>
              <Text className="text-white font-semibold">
                {item.menuItem?.name}
              </Text>

              <Text className="text-zinc-400">
                Qty: {item.quantity}
              </Text>
            </View>

            <Text className="text-orange-500 font-bold">
              ₹{item.price}
            </Text>
          </View>
        ))}
        </View>

        {/* Total */}
        <View className="bg-zinc-900 rounded-2xl p-5 mt-4">

          <Text className="text-zinc-400">
            Total Amount
          </Text>

          <Text className="text-white text-3xl font-bold mt-2">
            ₹{order.totalAmount}
          </Text>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}