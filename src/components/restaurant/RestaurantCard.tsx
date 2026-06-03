import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../navigation/types';

type RestaurantCardProps={
    id:string;
    name:string;
    address:string;
    description:string;
    imageUrl:string;
    rating:number;
};

type RestaurantNavigationProp=NativeStackNavigationProp<RootStackParamList, 'Restaurant'>

export default function RestaurantCard({
    id,
    name,
    address,
    description,
    imageUrl,
    rating
}:RestaurantCardProps){
    const navigation=useNavigation<RestaurantNavigationProp>();

    const handlePress =()=>{
        navigation.navigate('Restaurant',{
            restaurant:{
                id,
                name,
                address,
                description,
                imageUrl,
                rating,
            },
        });
    };

    return (
    <TouchableOpacity
      onPress={handlePress}
      className="mb-4 rounded-2xl bg-zinc-900 p-4"
      activeOpacity={0.8}
    >
       <Image
        source={{ uri: imageUrl }}
        className="w-full h-48"
        resizeMode="cover"
      />
       <View className="p-4">
        <View className="flex-row justify-between">
      <Text className="text-white text-xl font-bold">
        {name}
      </Text>

        <View className="bg-green-600 px-2 py-1 rounded">
            <Text className="text-white">
              ⭐ {rating}
            </Text>
          </View>
        </View>

      <Text className="text-orange-500 mt-2">
        📍 {address}
      </Text>

      <Text
        className="text-zinc-400 mt-2"
        numberOfLines={2}
      >
        {description}
      </Text>
      </View>
    </TouchableOpacity>
  );
}
