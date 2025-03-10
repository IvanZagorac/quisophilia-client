import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/Navigator';
import { useFonts } from 'expo-font';
import AppLoading from './components/AppLoading'; 


export default function App() 
{

    const [fontsLoaded] = useFonts({
        'Lato-Regular': require('./assets/fonts/Lato/Lato-Regular.ttf'),
        'Lato-Bold': require('./assets/fonts/Lato/Lato-Bold.ttf'),
        'PlayfairDisplay-Regular': require('./assets/fonts/Playfair_Display/PlayfairDisplay-Regular.ttf'),
        'PlayfairDisplay-Bold': require('./assets/fonts/Playfair_Display/PlayfairDisplay-Bold.ttf'),
    });

    if (!fontsLoaded) 
    {
        return <AppLoading loadingText="Loading fonts, please wait..." />;
    }

    return (
        <>
            <AppNavigator />
            <StatusBar style="auto" />
        </>
    );
}

