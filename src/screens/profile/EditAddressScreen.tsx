import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { addressApi } from '../../api/addressApi';

export default function EditAddressScreen({
  route,
  navigation,
}: any) {
  const {id} = route.params;

  const [type, setType] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [userId, setUserId] = useState('');

  const loadAddress = useCallback(async () => {
  try {
    const address = await addressApi.getById(id);

    setType(address.type);
    setAddressLine(address.addressLine);
    setCity(address.city);
    setState(address.state);
    setPincode(address.pincode);
    setUserId(address.userId);
  } catch (error) {
    console.error(error);
  }
}, [id]);

useEffect(() => {
  loadAddress();
}, [loadAddress]);

  const handleUpdate = async () => {
    try {
      await addressApi.update(id, {
        id,
        userId,
        type,
        addressLine,
        city,
        state,
        pincode,
      });

      Alert.alert(
        'Success',
        'Address updated successfully',
      );

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Failed to update address',
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView className="p-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text className="text-white text-3xl font-bold mt-4">
          Edit Address
        </Text>

        <TextInput
          value={type}
          onChangeText={setType}
          placeholder="Type"
          placeholderTextColor="#71717A"
          className="bg-zinc-900 text-white p-4 rounded-xl mt-6"
        />

        <TextInput
          value={addressLine}
          onChangeText={setAddressLine}
          placeholder="Address Line"
          placeholderTextColor="#71717A"
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="City"
          placeholderTextColor="#71717A"
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TextInput
          value={state}
          onChangeText={setState}
          placeholder="State"
          placeholderTextColor="#71717A"
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TextInput
          value={pincode}
          onChangeText={setPincode}
          placeholder="Pincode"
          placeholderTextColor="#71717A"
          keyboardType="numeric"
          className="bg-zinc-900 text-white p-4 rounded-xl mt-4"
        />

        <TouchableOpacity
          onPress={handleUpdate}
          className="bg-orange-600 p-4 rounded-xl mt-8">
          <Text className="text-white text-center font-semibold">
            Update Address
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}