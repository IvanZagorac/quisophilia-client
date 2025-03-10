import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import { globalStyles } from '../styles/globalStyles';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { navigationRef } from '../../components/Navigation';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => 
{
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator 
                screenOptions={{ headerStyle: globalStyles.backgroundColor, headerTintColor: 'white', }} 
                initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
