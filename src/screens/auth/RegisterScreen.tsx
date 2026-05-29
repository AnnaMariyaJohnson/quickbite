import React,{useState} from "react";
import {View,Text,TextInput,TouchableOpacity, Alert,ActivityIndicator,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/types';
import  api from '../../api/axios';

type RegisterScreenNavigationProp = NavigationProp<RootStackParamList,'Register'>;

export default function RegisterScreen(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    // const handleRegister=async()=>{
    //     if(!name.trim() || !email.trim() || !phone.trim() || !password.trim()){
    //         Alert.alert('Error','Please fill in all fields');
    //         return;
    //     }
    //     if(password.length<6){
    //         Alert.alert('Error','Password must be at least 6 characters');
    //         return;
    //     }
    //     setLoading(true);
    //     try{
    //         const response = await api.post('/auth/register',{
    //             name:name.trim(),
    //             email:email.trim(),
    //             phone:phone.trim(),
    //             password,
    //         });
    //         Alert.alert(
    //             'Account Created',
    //             'Your account has been created successfully. Please log in.',
    //             [
    //                 {
    //                     text:'Go to Login',
    //                     onPress:()=>{
    //                         navigation.navigate('Login');
    //                     },
    //                 }
    //             ]
    //         );
    //         setName('');
    //         setEmail('');
    //         setPhone('');
    //         setPassword('');
    //     }catch(error:unknown){
    //         let message='Something went wrong. Please try again.';
    //         if(error && typeof error === 'object' && 'response' in error){
    //             const err=error as {response?:{data?:{message?:string}}};
    //             message=err.response?.data?.message || message;
    //         }else if(error instanceof Error){
    //             message=error.message;
    //         }
    //         Alert.alert('Registration Error',message);
    //     }finally{
    //         setLoading(false);
    //     }
    // };

// === MOCK REGISTRATION HANDLER (Temporary) ===
    const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        Alert.alert('Error', 'Please fill all fields');
        return;
    }

    if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
    }

    setLoading(true);

    try {
        // === MOCK REGISTRATION (Temporary) ===
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay

        // Simulate successful registration
        Alert.alert(
        'Account Created Successfully!',
        `Welcome ${name}! You can now login.`,
        [
            {
            text: 'Go to Login',
            onPress: () => navigation.navigate('Login'),
            },
        ]
        );

        // Optional: Auto-fill login email
        // navigation.navigate('Login', { email }); // You can enhance later

    } catch (error: unknown) {
        let message = 'Something went wrong. Please try again.';

        if (error && typeof error === 'object' && 'message' in error) {
        message = (error as { message?: string }).message || message;
        }

        Alert.alert('Registration Failed', message);
    } finally {
        setLoading(false);
    }
    };

    return(
        <SafeAreaView className="flex-1 bg-zinc-950">
            <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-8">
                <View className="items-center mb-10">
                <Text className="text-5xl font-bold text-orange-500">QuickBite</Text>
                <Text className="text-zinc-400 text-xl mt-3">Create new account</Text>
                </View>

                <View className="space-y-5">
                {/* Full Name */}
                <View>
                    <Text className="text-zinc-400 mb-2 ml-1 font-medium">Full Name</Text>
                    <View className="bg-zinc-900 rounded-2xl px-5 py-4 flex-row items-center border border-zinc-800">
                    <Icon name="person" size={24} color="#a3a3a3" />
                    <TextInput
                        className="flex-1 ml-4 text-white text-base"
                        placeholder="John Doe"
                        placeholderTextColor="#52525b"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />
                    </View>
                </View>

                {/* Email */}
                <View>
                    <Text className="text-zinc-400 mb-2 ml-1 font-medium">Email</Text>
                    <View className="bg-zinc-900 rounded-2xl px-5 py-4 flex-row items-center border border-zinc-800">
                    <Icon name="email" size={24} color="#a3a3a3" />
                    <TextInput
                        className="flex-1 ml-4 text-white text-base"
                        placeholder="your@email.com"
                        placeholderTextColor="#52525b"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    </View>
                </View>

                {/* Phone */}
                <View>
                    <Text className="text-zinc-400 mb-2 ml-1 font-medium">Phone Number</Text>
                    <View className="bg-zinc-900 rounded-2xl px-5 py-4 flex-row items-center border border-zinc-800">
                    <Icon name="phone" size={24} color="#a3a3a3" />
                    <TextInput
                        className="flex-1 ml-4 text-white text-base"
                        placeholder="9876543210"
                        placeholderTextColor="#52525b"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                    </View>
                </View>

                {/* Password */}
                <View>
                    <Text className="text-zinc-400 mb-2 ml-1 font-medium">Password</Text>
                    <View className="bg-zinc-900 rounded-2xl px-5 py-4 flex-row items-center border border-zinc-800">
                    <Icon name="lock" size={24} color="#a3a3a3" />
                    <TextInput
                        className="flex-1 ml-4 text-white text-base"
                        placeholder="Create a strong password"
                        placeholderTextColor="#52525b"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleRegister}
                    disabled={loading}
                    className="bg-orange-600 py-4 rounded-2xl mt-8 active:opacity-90"
                >
                    {loading ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                    <Text className="text-white text-center font-semibold text-lg">
                        Create Account
                    </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    className="py-4"
                >
                    <Text className="text-center text-zinc-400">
                    Already have an account? <Text className="text-orange-500 font-medium">Sign In</Text>
                    </Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
    </SafeAreaView>
    )
}