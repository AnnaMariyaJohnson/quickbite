import React from 'react';
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
import { useOrderStore } from '../../store/orderStore';

type OrderDetailsRouteProp = RouteProp<
  RootStackParamList,
  'OrderDetails'
>;

export default function OrderDetailsScreen() {
  const route =
    useRoute<OrderDetailsRouteProp>();
  const navigation = useNavigation();

  const { orderId } = route.params;

  const order = useOrderStore(state =>
    state.orders.find(
      o => o.id === orderId,
    ),
  );

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
      <ScrollView className="p-4">

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

        {/* Status */}
        <View className="bg-zinc-900 rounded-2xl p-5 mt-4">

          <Text className="text-zinc-400">
            Status
          </Text>

          <Text className="text-orange-500 text-lg font-semibold mt-2">
            {order.status}
          </Text>

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