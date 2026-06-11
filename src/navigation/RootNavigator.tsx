// src/navigation/index.tsx  (or wherever your navigator is)
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CheckoutSCreen from '../screens/order/CheckoutScreen';
import OrderDetailsScreen from '../screens/order/OrderDetailsScreen';
import AddAddressScreen from '../screens/profile/AddAddressScreen';
import AddressesScreen from '../screens/profile/AddressesScreen';
import EditAddressScreen from '../screens/profile/EditAddressScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import RestaurantScreen from '../screens/restaurant/RestaurantScreen';
import CartScreen from '../screens/tabs/CartScreen';
import HomeScreen from '../screens/tabs/HomeScreen';
import OrdersScreen from '../screens/tabs/OrdersScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import SearchScreen from '../screens/tabs/SearchScreen';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { RootStackParamList, TabParamList } from './types';
import FavoritesScreen from '../screens/profile/FavoritesScreen';
import NotificationsScreen from '../screens/profile/NotificationsScreen';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  const totalItems = useCartStore((state) => state.totalItems);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#18181b',
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#FF3D00',
        tabBarInactiveTintColor: '#71717a',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="search" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="receipt-long" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
   const {isAuthenticated,isLoading,loadStoredUser} = useAuthStore();

   useEffect(()=>{
    loadStoredUser();
   },[loadStoredUser]);
   
   if(isLoading){
    return(
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size='large' color='#FF3D00' />
      </View>
    )
   }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <Stack.Screen name="Tabs" component={TabNavigator} />
      )}
      <Stack.Screen
        name="Restaurant"
        component={RestaurantScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutSCreen}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="Addresses"
        component={AddressesScreen}
      />

      <Stack.Screen
        name="AddAddress"
        component={AddAddressScreen}
      />

      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </Stack.Navigator>
    
  );
}