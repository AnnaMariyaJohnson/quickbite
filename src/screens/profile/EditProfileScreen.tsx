import React,{useEffect, useState} from 'react';
import {View,Text,TextInput,TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../../store/authStore';
import {userApi} from '../../api/userApi';

export default function EditProfileScreen(){
    const navigation=useNavigation();
    const user=useAuthStore(state=>state.user);
    const [fullName,setFullName]=useState(user?.name??'');
    const [phone,setPhone]=useState('');
    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        loadProfile();
    },[]);
    
    const loadProfile=async()=>{
        try{
            const profile=await userApi.getProfile();
            setFullName(profile.fullName);
            setPhone(profile.phone ?? '');
        } catch(error){
            console.error('Failed to load profile',error);
        }
    };

    const handleSave=async()=>{
        if(!fullName.trim()){
            Alert.alert(
                'Validation Error',
                'Full name is required'
            );
            return;
        }
        try{
            setLoading(true);
            await userApi.updateProfile({
                fullName:fullName.trim(),
                phone:phone.trim(),
            });
            Alert.alert(
                'Success',
                'Profile updated successfully',
                [
                    {
                        text:'OK',
                        onPress:()=>navigation.goBack(),
                    }
                ]
            );
        }
        catch(error){
            console.error(error);
            Alert.alert(
                'Error',
                'Failed to update profile'
            );
        } finally{
            setLoading(false);
        }
    };

    return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="flex-row items-center px-4 py-4 border-b border-zinc-800">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-back"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        <Text className="text-white text-xl font-semibold ml-4">
          Edit Profile
        </Text>
      </View>

      <View className="p-5">
        <Text className="text-zinc-400 mb-2">
          Full Name
        </Text>

        <TextInput
          value={fullName}
          onChangeText={setFullName}
          className="bg-zinc-900 text-white rounded-xl px-4 py-4 mb-5"
        />

        <Text className="text-zinc-400 mb-2">
          Phone
        </Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          className="bg-zinc-900 text-white rounded-xl px-4 py-4"
        />

        <TouchableOpacity
          onPress={handleSave}
          className="bg-orange-600 rounded-xl py-4 mt-8"
        >
          <Text className="text-center text-white font-semibold">
            {loading ? 'Saving...':'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}