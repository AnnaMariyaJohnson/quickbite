import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Define all your screens and  their params here
export type RootStackParamList={
    Tabs:NavigatorScreenParams<TabParamList>;
    Restaurant:{
        restaurant:{
            id:string;
            name:string;
            address:string;
            description:string;
            imageUrl:string;
            rating:number;
        };
    };
    Login:undefined;
    Register:undefined;
    Checkout:undefined;
    EditProfile:undefined;
    OrderDetails:{
        orderId:string;
    };
    Addresses: undefined;
    AddAddress: undefined;
    EditAddress: {
    id: string;
    };
    Favorites:undefined;
    Notifications: undefined;
}

export type TabParamList={
    Home:undefined;
    Search:undefined;
    Orders:undefined;
    Profile:undefined;
    Cart:undefined;
}

export type RestaurantScreenProps=NativeStackScreenProps<RootStackParamList,'Restaurant'>;