import {View, Text,Image,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type RestaurantCardProps={
    id:string;
    name:string;
    address:string;
    description:string;
};

type RestaurantNavigationProp=NativeStackNavigationProp<RootStackParamList, 'Restaurant'>

export default function RestaurantCard({
    id,
    name,
    address,
    description,
}:RestaurantCardProps){
    const navigation=useNavigation<RestaurantNavigationProp>();

    const handlePress =()=>{
        navigation.navigate('Restaurant',{
            restaurant:{
                id,
                name,
                address,
                description,
            },
        });
    };

    return (
    <TouchableOpacity
      onPress={handlePress}
      className="mb-4 rounded-2xl bg-zinc-900 p-4"
      activeOpacity={0.8}
    >
      <Text className="text-white text-xl font-bold">
        {name}
      </Text>

      <Text className="text-orange-500 mt-2">
        📍 {address}
      </Text>

      <Text
        className="text-zinc-400 mt-2"
        numberOfLines={2}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
}
