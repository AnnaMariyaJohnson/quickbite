import {View, Text,Image,TouchableOpacity} from 'react-native';
import {COLORS,SIZES} from '../../constants/colors';

type RestaurantCardProps={
    name:string;
    image:string;
    cuisine:string;
    rating:number;
    time:string;
    deliveryFee:string;
    onPress:()=> void;
};

export default function RestaurantCard({
    name,
    image,
    cuisine,
    rating, 
    time,
    deliveryFee,
    onPress,
}:RestaurantCardProps){
    return(
        <TouchableOpacity
            onPress={onPress}
            className='mb-5 rounded-3xl overflow-hidden bg-zinc-900'
            activeOpacity={0.9}>
                <Image source={{uri:image}} className='"w-full h-48'/>
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