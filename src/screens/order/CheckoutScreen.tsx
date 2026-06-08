/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addressApi } from '../../api/addressApi';
import { orderApi } from '../../api/orderApi';
import { RootStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { Address } from '../../types/address';

export default function CheckoutSCreen(){
    const {items,totalPrice,clearCart}=useCartStore();
    const addOrder = useOrderStore(state => state.addOrder);
    const navigation=useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const[loading,setLoading]=useState(false);
    const user=useAuthStore(state=>state.user);
    const[addresses, setAddresses]=useState<Address[]>([]);
    const[selectedAddressId,setSelectedAddressId]=useState('');

    useEffect(()=>{
        loadAddresses();
    },[]);

    const loadAddresses=async()=>{
        try{
            if(!user?.id){
                return;
            }
            const data=await addressApi.getByUserId(user.id);
            setAddresses(data);
        }catch(error){
            console.error(error);
        }
    };

    const handlePlaceOrder=async()=>{
         if (items.length === 0) {
            Alert.alert(
                'Cart Empty',
                'Please add items before placing an order.'
            );
            return;
            }

        if(!selectedAddressId){
            Alert.alert(
                'Address Required',
                'Please select a delivery address'
            );
            return;
        }

        try{
            setLoading(true);
            const selectedAddress =
                addresses.find(
                    a => a.id === selectedAddressId,
                );

                const order =
                await orderApi.createOrder({
                    totalAmount: totalPrice,
                    addressId: selectedAddressId,
                    deliveryAddress:
                    `${selectedAddress?.addressLine},
                    ${selectedAddress?.city},
                    ${selectedAddress?.state}`,
                });
        addOrder(order);

        clearCart();
        
        Alert.alert(
            'Success',
            'Order placed successfully',
            [
                {
                    text:'Ok',
                    onPress:()=>
                        navigation.navigate('Tabs',{
                            screen:'Orders',
                        }),
                },
            ]
        );
    }catch(error){
        console.error(error);
        Alert.alert(
            'Error',
            'Failed to place order. Please try again.'
        );
    }finally{
        setLoading(false);
    }
    };

    return(
        <SafeAreaView className="flex-1 bg-zinc-950">
            <ScrollView className='p-4'>
                <Text className='text-white text-3xl font-bold'>
                    Checkout
                </Text>
                <Text className="text-white text-xl font-semibold mt-6 mb-3">
                Delivery Address
                </Text>
                {
                addresses.map(address => (
                    <TouchableOpacity
                    key={address.id}
                    onPress={() =>
                        setSelectedAddressId(address.id)
                    }
                    className={`p-4 rounded-2xl mb-3 ${
                        selectedAddressId === address.id
                        ? 'bg-orange-600'
                        : 'bg-zinc-900'
                    }`}
                    >
                    <Text className="text-white font-bold">
                        {address.type}
                    </Text>

                    <Text className="text-zinc-300">
                        {address.addressLine}
                    </Text>

                    <Text className="text-zinc-400">
                        {address.city},
                        {address.state}
                    </Text>
                    </TouchableOpacity>
                ))
                }
                {/* Empty Address Case */}
               {addresses.length === 0 && (
                <View className="bg-zinc-900 p-4 rounded-xl mb-4">
                    <Text className="text-white text-center mb-3">
                    No delivery address found
                    </Text>

                    <TouchableOpacity
                    onPress={() => navigation.navigate('AddAddress')}
                    className="bg-orange-600 p-3 rounded-xl"
                    >
                    <Text className="text-white text-center">
                        Add Address
                    </Text>
                    </TouchableOpacity>
                </View>
                )}

                <View className='mt-6'>
                    {items.map(item=>(
                        <View
                            key={item.id}
                            className='bg-zinc-900 p-4 rounded-2xl mb-3'>
                                <Text className='text-white'>
                                    {item.name}
                                </Text>
                                <Text className='text-zinc-400'>
                                    Qty:{item.quantity}
                                </Text>
                                <Text className='text-orange-500 font-bold'>
                                    ₹{item.price}
                                </Text>
                        </View>
                    ))}
                </View>
                <View className='bg-zinc-900 p-4 rounded-2xl mt-4'>
                    <Text className='text-white text-xl'>
                        Total: ₹{totalPrice}
                    </Text>
                </View>
                    
            </ScrollView>
            <View className='p-4'>
                <TouchableOpacity
                    disabled={loading}
                    onPress={handlePlaceOrder}
                    className='bg-orange-600 p-4 rounded-2xl'>
                        {loading ?(
                            <ActivityIndicator color="#fff"/>
                        ):(
                            <Text className='text-white text-center'>
                                Place Order
                            </Text>
                        )}
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}