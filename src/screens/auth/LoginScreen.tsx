import React,{useState} from 'react';
import {View,Text,TextInput,TouchableOpacity, Alert,ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/types';

type LoginScreenNavigationProp = NavigationProp<RootStackParamList,'Login'>;

export default function LoginScreen(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const {login}=useAuthStore();
    const navigation=useNavigation<LoginScreenNavigationProp>();

    const handleLogin=async()=>{
        if(!email || !password){
            Alert.alert('Error','Please enter both email and password');
            return;
        }
        setLoading(true);
        try{
            await login(email,password);

            //Reset navigation to main tabs after successful login
            navigation.reset({
                index:0,
                routes:[{name:'Tabs' }],
            });
        }catch(error:unknown){
            let message='Login failed. Please try again.';
            if(error && typeof error === 'object' && 'response' in error){
                const err=error as {response?:{data?:{message?:string}}};
                message=err.response?.data?.message || message;
            }else if(error instanceof Error){
                message=error.message;
            }
            Alert.alert('Error',message);
        }finally{
            setLoading(false);
        }
    };
    return(
        <SafeAreaView className='flex-1 bg-zinc-950'>
            <View className='flex-1 justify-center px-6'>
                <View className='items-center mb-12'>
                    <Text className='text-5xl font-bold text-orange-500'>QuickBite</Text>
                    <Text className='text-zinc-400 text-xl mt-3'>Welcome back</Text>
                </View>
                <View className='space-y-5'>
                    {/*Email*/}
                    <View>
                        <Text className='text-zinc-400 mb-2 ml-1 font-medium'>Email</Text>
                        <View className='bg-zinc-900 rounded-2xl px-5 py-4 flex-row items-center border border-zinc-800'>
                            <Icon name='email' size={24} color='#a3a3a3' />
                            <TextInput
                                className=' flex-1 ml-4  text-white text-base'
                                placeholder='Enter your email'
                                value={email}
                                onChangeText={setEmail}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
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
                            placeholder="Enter your password"
                            placeholderTextColor="#52525b"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={loading}
                    className='bg-orange-600 py-4 rounded-2xl mt-8 active:opacity-90'>
                        {loading?(
                            <ActivityIndicator color ='#fff'/>
                        ):(
                            <Text className='text-white text-center font-semibold text-lg'>Sign In</Text>
                        )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>navigation.navigate('Register')}
                    className='py-4'>
                        <Text className='text-center text-zinc-400'>
                            Don't have an account? <Text className='text-orange-500 font-medium'>Sign Up</Text>
                        </Text>
                </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
    )
}