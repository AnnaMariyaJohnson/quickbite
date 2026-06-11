import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';
import { notificationApi } from '../../api/notificationApi';

type ProfileScreenNavigationProp = NavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const {user,logout,isAuthenticated}=useAuthStore();
  const navigation=useNavigation<ProfileScreenNavigationProp>();
  const [unreadCount, setUnreadCount] =useState(0);

  const loadUnreadCount = async () => {
    if (!user?.id) {
      return;
    }

    try {
      const count =
        await notificationApi.getUnreadCount(
          user.id,
        );

      setUnreadCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUnreadCount();
  }, [user?.id]);

  const handleLogout=()=>{
    Alert.alert('Logout','Are you sure you want to logout?',[
      {text:'Cancel',style:'cancel'},
      {
        text:'Logout',style:'destructive',onPress: async ()=>{
          await logout();
          navigation.reset({
            index:0,
            routes:[{name:'Login'}],
          });
        },
      },
    ]);
  };
  //If user is not logged in
  if(!isAuthenticated || !user){
    return(
      <SafeAreaView className="flex-1 bg-zinc-950 justify-center items-center px-6">
        <Icon name="person-off" size={90} color="#3f3f46" />
        <Text className="text-white text-2xl font-semibold mt-8">Not Logged In</Text>
        <Text className="text-zinc-400 text-center mt-3 mb-10">
          Login to view your profile and orders
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="bg-orange-600 px-12 py-4 rounded-2xl"
        >
          <Text className="text-white text-lg font-semibold">Login / Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  //Logged in user view
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="items-center pt-10 pb-8 bg-zinc-900">
          <View className="w-24 h-24 bg-zinc-700 rounded-full items-center justify-center mb-4">
            <Icon name="person" size={60} color="#f3f4f6" />
          </View>
          <Text className="text-white text-2xl font-bold">{user.name}</Text>
          <Text className="text-zinc-400">{user.email}</Text>
          {/* <Text className='text-zinc-500 text-xs mt-2'>
            ID:{user.id}
          </Text> */}
          <TouchableOpacity
            className="bg-orange-600 px-6 py-2 rounded-xl mt-4"
            onPress={() =>
              navigation.navigate('EditProfile')
            }
          >
            <Text className="text-white font-semibold">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-6">
          {/* Menu Items */}
          {[
            { title: 'My Addresses', icon: 'location-on' },
            { title: 'Payment Methods', icon: 'payment' },
            { title: 'Favorites', icon: 'favorite' },
            { title: 'Order History', icon: 'history' },
            { title: 'Notifications', icon: 'notifications' },
            { title: 'Help & Support', icon: 'help-outline' },
          ].map((item, i) => (
            <TouchableOpacity key={i} className="flex-row items-center py-5 border-b border-zinc-800"
              onPress={() => {
              switch (item.title) {
                case 'My Addresses':
                  navigation.navigate('Addresses');
                  break;

                case 'Order History':
                  navigation.navigate('Tabs', {
                    screen: 'Orders',
                  });
                  break;

                  case 'Favorites':
                    navigation.navigate('Favorites');
                    break;

                  case 'Notifications':
                    navigation.navigate('Notifications')
                    break;

                default:
                  break;
              }
            }}>
               {item.title === 'Notifications' ? (
                <View className='mr-4'>
                  <Icon
                    name="notifications"
                    size={28}
                    color="#71717a"
                  />

                  {unreadCount > 0 && (
                    <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center">
                      <Text className="text-white text-[10px]">
                        {unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <Icon
                  name={item.icon}
                  size={28}
                  color="#71717a"
                  style={{marginRight:16}}
                />
              )}
              <Text className="text-white text-lg flex-1">{item.title}</Text>
              <Icon name="chevron-right" size={28} color="#71717a" />
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity className="mt-10 py-4" onPress={handleLogout}>
            <Text className="text-red-500 text-center text-lg font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}