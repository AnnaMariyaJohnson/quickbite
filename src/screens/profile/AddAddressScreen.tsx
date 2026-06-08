import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { addressApi } from '../../api/addressApi';
import { useAuthStore } from '../../store/authStore';

export default function AddAddressScreen() {
  const navigation = useNavigation();

  const user = useAuthStore(state => state.user);

  const [type, setType] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const handleSave = async () => {
    try {
      if (
        !type ||
        !addressLine ||
        !city ||
        !state ||
        !pincode
      ) {
        Alert.alert('Validation', 'Please fill all fields');
        return;
      }

      await addressApi.create({
        userId: user?.id || '',
        type,
        addressLine,
        city,
        state,
        pincode,
      });

      Alert.alert('Success', 'Address added successfully');

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add address');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView className="p-4">
         <View className="flex-row items-center px-4 py-4 border-b border-zinc-800">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold ml-4">
          Add Address
        </Text>
        </View>
        <TextInput
          placeholder="Home / Work"
          placeholderTextColor="#71717A"
          value={type}
          onChangeText={setType}
          className="bg-zinc-900 text-white p-4 rounded-xl mt-6"
        />

        <TextInput
          placeholder="Address Line"
          placeholderTextColor="#71717A"
          value={addressLine}
          onChangeText={setAddressLine}
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TextInput
          placeholder="City"
          placeholderTextColor="#71717A"
          value={city}
          onChangeText={setCity}
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TextInput
          placeholder="State"
          placeholderTextColor="#71717A"
          value={state}
          onChangeText={setState}
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TextInput
          placeholder="Pincode"
          placeholderTextColor="#71717A"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="numeric"
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TouchableOpacity
          onPress={handleSave}
          className="bg-orange-600 p-4 rounded-xl mt-8">
          <Text className="text-white text-center font-semibold">
            Save Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}