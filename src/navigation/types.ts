import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// Define all your screens and  their params here
export type RootStackParamList={
    Tabs:NavigatorScreenParams<TabParamList>;
    Restaurant:{
        restaurant:{
            id:string;
            name:string;
            image:string;
            cuisine:string;
            rating:number;
            time:string;
            deliveryFee:string;
        };
    };
}

export type TabParamList={
    Home:undefined;
    Search:undefined;
    Orders:undefined;
    Profile:undefined;
    Cart:undefined;
}

export type RestaurantScreenProps=NativeStackScreenProps<RootStackParamList,'Restaurant'>;