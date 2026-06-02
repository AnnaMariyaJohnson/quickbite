import React, { use } from 'react';
import {View,Text,TouchableOpacity,ScrollView,Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

export default function CheckoutSCreen(){
    const {items,totalPrice,clearCart}=useCartStore();
    const addOrder=useOrderStore(state=>state.addOrder);
    const navigation=useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePlaceOrder=()=>{
        addOrder({
            id:'QB-' + Date.now(),
            total:totalPrice,
            date:new Date().toLocaleDateString(),
            items,
        });
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
    };

    return(
        <SafeAreaView className="flex-1 bg-zinc-950">
            <ScrollView className='p-4'>
                <Text className='text-white text-3xl font-bold'>
                    Checkout
                </Text>
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
                    onPress={handlePlaceOrder}
                    className='bg-orange-600 p-4 rounded-2xl'>
                        <Text className='text-white text-center'>
                            Place Order
                        </Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}