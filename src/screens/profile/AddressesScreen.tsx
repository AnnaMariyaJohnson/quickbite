import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { addressApi } from '../../api/addressApi';
import { RootStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { Address } from '../../types/address';

export default function AddressesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useAuthStore(state => state.user);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAddresses = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const data = await addressApi.getByUserId(user.id);
      setAddresses(data || []);
    } catch (error) {
      console.error('Failed to load addresses:', error);
      Alert.alert('Error', 'Failed to load addresses');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAddresses();
    setRefreshing(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await addressApi.delete(id);

              setAddresses(prev =>
                prev.filter(address => address.id !== id),
              );

              Alert.alert(
                'Success',
                'Address deleted successfully',
              );
            } catch (error) {
              console.error(error);

              Alert.alert(
                'Error',
                'Failed to delete address',
              );
            }
          },
        },
      ],
    );
  };

  const renderAddress = ({item}: {item: Address}) => (
    <View className="bg-zinc-900 rounded-2xl p-4 mb-4">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-orange-500 text-lg font-bold">
            {item.type}
          </Text>

          <Text className="text-white mt-3">
            {item.addressLine}
          </Text>

          <Text className="text-zinc-400 mt-1">
            {item.city}, {item.state}
          </Text>

          <Text className="text-zinc-400 mt-1">
            {item.pincode}
          </Text>
        </View>

        <View className="flex-row">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditAddress', {
                id: item.id,
              })
            }
            className="mr-4">
            <Icon
              name="edit"
              size={22}
              color="#F97316"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDelete(item.id)}>
            <Icon
              name="delete"
              size={22}
              color="#EF4444"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-zinc-800">
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold ml-4">
          My Addresses
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            size="large"
            color="#F97316"
          />

          <Text className="text-zinc-400 mt-3">
            Loading addresses...
          </Text>
        </View>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={renderAddress}
          contentContainerClassName="p-4 pb-24"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F97316']}
            />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center mt-20">
              <Icon
                name="location-on"
                size={70}
                color="#52525B"
              />

              <Text className="text-zinc-400 text-lg mt-4">
                No Addresses Found
              </Text>

              <Text className="text-zinc-500 mt-2 text-center">
                Add your first delivery address
              </Text>
            </View>
          }
        />
      )}

      {/* Add Address Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddAddress')}
        className="absolute bottom-6 left-6 right-6 bg-orange-600 py-4 rounded-2xl">
        <Text className="text-white text-center text-lg font-semibold">
          Add Address
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}