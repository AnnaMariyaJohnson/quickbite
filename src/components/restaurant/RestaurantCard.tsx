import {View, Text,Image,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type RestaurantCardProps={
    id:string;
    name:string;
    image:string;
    cuisine:string;
    rating:number;
    time:string;
    deliveryFee:string;
};

type RestaurantNavigationProp=NativeStackNavigationProp<RootStackParamList, 'Restaurant'>

export default function RestaurantCard({
    id,
    name,
    image,
    cuisine,
    rating, 
    time,
    deliveryFee,
}:RestaurantCardProps){
    const navigation=useNavigation<RestaurantNavigationProp>();

    const handlePress =()=>{
        navigation.navigate('Restaurant',{
            restaurant:{
                id,
                name,
                image,
                cuisine,
                rating,
                time,
                deliveryFee
            },
        });
    };

    return(
        <TouchableOpacity
            onPress={handlePress}
            className='mb-5 rounded-3xl overflow-hidden bg-zinc-900'
            activeOpacity={0.9}>
                <Image source={{uri:image}} className='"w-full h-48' resizeMode='cover'/>
                <View className='p-4'>
                    <View className='flex-row justify-between items-start'>
                        <Text className='text-white text-lg font-semibold flex-1' numberOfLines={1}>
                            {name}
                        </Text>
                        <View className='bg-green-600 px-2 py-0.5 rounded flex-row items-center'>
                            <Text className='text-white text-xs font-bold'>*{rating}</Text>
                        </View>
                    </View>
                    <Text className='text-zinc-400 mt-1'>{cuisine}</Text>
                </View>

                <View className='flex-row items-center mt-2'>
                    <Text className='text-emerald-400 text-sm'>{time}</Text>
                    <Text className='text-zinc-500 mx-2'>*</Text>
                    <Text className='text-emerald-400 text-sm'>{deliveryFee}</Text>
                </View>
            </TouchableOpacity>
    )
}