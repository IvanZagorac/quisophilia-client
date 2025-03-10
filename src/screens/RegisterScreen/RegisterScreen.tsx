import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image } from 'react-native';
import { z } from 'zod';
import api from '../../api/api';
import { UserRegisterType } from '../../types/UserRegisterType';
import { saveToken } from '../../api/authUtils';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { navigate } from '../../../components/Navigation';
import { registerStyles } from './RegisterStyle';
import { globalStyles } from '../../styles/globalStyles';

const registerSchema = z.object({
    name: z.string().min(2, 'Ime mora imati najmanje 2 slova'),
    surname: z.string().min(2, 'Prezime mora imati najmanje 2 slova'),
    email: z.string().email('Neispravan email'),
    password: z.string().min(6, 'Lozinka mora imati najmanje 6 znakova'),
    confirmPassword: z.string().min(6, 'Potvrda lozinke je obavezna'),
    address: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Lozinke se ne podudaraju',
    path: ['confirmPassword'],
});


const RegisterScreen = () => 
{
    const [user, setUser] = useState<UserRegisterType>({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: undefined,
        teamId: undefined,     
        type: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const pickImage = async () => 
    {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });
        console.log(result);
        console.log(typeof result);
    
        if (!result.canceled) 
        {
            setUser({ ...user, image: result.assets[0].uri });
        }
    };

    const handleChange = (key: string, value: string) => 
    {
        setUser({ ...user, [key]: value });
    };

    const doRegister = async() => 
    {
        const validation = registerSchema.safeParse(user);

        if (!validation.success) 
        {
            const formattedErrors: Record<string, string> = {};
            validation.error.errors.forEach((err: any) => 
            {
                if (err.path.length > 0) 
                {
                    formattedErrors[err.path[0]] = err.message;
                }
            });
            setErrors(formattedErrors);
            return;
        }
        const params = {...user}

        delete params.confirmPassword
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('surname', user.surname);
        formData.append('email', user.email);
        formData.append('password', user.password);
        formData.append('type', user.type);
        console.log(user.image);
        if (user.image) 
        {
            formData.append('image', user.image);
            // const filename = user.image.split('/').pop();
            // const match = /\.(\w+)$/.exec(filename ?? '');
            // const type = match ? `image/${match[1]}` : 'image';
        
            // Convert URI to Blob
            // const imageBlob = await convertUriToBlob(user.image);
        
            // Append the Blob to FormData
        }
        
        const response = await api(
            'auth/register',
            'POST',
            params,
            true
            
        );
        if (response.status === 'error')
        {
            setErrors(response.data)
                        
            return;
        }
        await saveToken(response.data.data.accessToken, 'token');
        await saveToken(response.data.data.refreshToken, 'refresh');
        
        navigate('Home');
              
        setErrors({});
        Alert.alert('Success', 'Form submitted successfully!');
    };

    return (
        <View style={globalStyles.container}>
            <Text style={registerStyles.title}>Name</Text>
            <TextInput
                style={registerStyles.input}
                placeholderTextColor="#A4A6AC"
                placeholder="Ime"
                onChangeText={(value) => handleChange('name', value)}
            />
            {errors.name && <Text style={registerStyles.error}>{errors.name}</Text>}
    
            <Text style={registerStyles.title}>Surname</Text>
            <TextInput
                style={registerStyles.input}
                placeholderTextColor="#A4A6AC"
                placeholder="Prezime"
                onChangeText={(value) => handleChange('surname', value)}
            />
            {errors.surname && <Text style={registerStyles.error}>{errors.surname}</Text>}
    
            <Text style={registerStyles.title}>Email</Text>
            <TextInput
                style={registerStyles.input}
                placeholderTextColor="#A4A6AC"
                placeholder="Email"
                onChangeText={(value) => handleChange('email', value)}
            />
            {errors.email && <Text style={registerStyles.error}>{errors.email}</Text>}
    
            <Text style={registerStyles.title}>Password</Text>
            <TextInput
                style={registerStyles.input}
                placeholderTextColor="#A4A6AC"
                placeholder="Lozinka"
                secureTextEntry
                onChangeText={(value) => handleChange('password', value)}
            />
            {errors.password && <Text style={registerStyles.error}>{errors.password}</Text>}
    
            <Text style={registerStyles.title}>Confirm Password</Text>
            <TextInput
                style={registerStyles.input}
                placeholderTextColor="#A4A6AC"
                placeholder="Potvrdi lozinku"
                secureTextEntry
                onChangeText={(value) => handleChange('confirmPassword', value)}
            />
            {errors.confirmPassword && <Text style={registerStyles.error}>{errors.confirmPassword}</Text>}

            <Picker
                selectedValue={user.type}
                onValueChange={(value) => handleChange('type', value)}
                style={registerStyles.picker}
            >
                <Picker.Item label="Player" value="Player" />
                <Picker.Item label="Maker" value="Maker" />
            </Picker>

            <Button title="Pick an image" onPress={pickImage} />
            {user.image && <Image source={{ uri: user.image }} style={{ width: 100, height: 100 }} />}
    
            <View style={registerStyles.registerContainer}>
                <Button title="Register" onPress={doRegister} />
            </View>

           
        </View>
    );
};
    
export default RegisterScreen;
