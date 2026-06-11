import React,{useState,useEffect} from 'react';
import { FlatList,Text,TouchableOpacity,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuthStore } from '../../store/authStore';
import { notificationApi } from '../../api/notificationApi';
import { Notification } from '../../types/notification';

export default function NotificationsScreen({
  navigation,
}: any) {

  const user =useAuthStore(state => state.user);
  const [notifications,setNotifications,] = useState<Notification[]>([]);

  const loadNotifications = async () => {
      if (!user?.id) {
        return;
      }
      try {
        const data =
          await notificationApi.getNotifications(
            user.id,
          );

        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead =async (id: string) => {
      await notificationApi.markAsRead(
        id,
      );
      loadNotifications();
    };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">

      <View className="flex-row items-center p-4">

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold ml-4">
          Notifications
        </Text>

      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              handleRead(item.id)
            }
            className={`m-4 p-4 rounded-xl ${
              item.isRead
                ? 'bg-zinc-900'
                : 'bg-orange-900'
            }`}
          >

            <Text className="text-white font-bold">
              {item.title}
            </Text>

            <Text className="text-zinc-300 mt-2">
              {item.message}
            </Text>

            <Text className="text-zinc-500 mt-2">
              {new Date(
                item.createdAt,
              ).toLocaleString()}
            </Text>

          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}