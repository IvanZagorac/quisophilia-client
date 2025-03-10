import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    backgroundColor:{
        backgroundColor: '#1C2342',
    },
    container:{
        backgroundColor: '#1C2342',
        flex: 1,
        justifyContent: 'center',
        padding: 40,
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: 'white'
    },
    headers: {
        fontFamily: 'PlayfairDisplay-Regular',
        color: 'white',
        fontSize: 24,
        marginBottom: 20
    },
    lightText: {
        color: '#A4A6AC',
        fontSize: 16
    },
    mainBtn: {
        backgroundColor: '#5171A5',
        paddingVertical: 10,
        paddingHorizontal: 30,
        color: 'white'
    }
});