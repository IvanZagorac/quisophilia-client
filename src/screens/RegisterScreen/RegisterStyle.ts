import { StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    loginBtn: {
        marginTop: 40,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#06D3F6',
        paddingBottom: 10,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    registerContainer: {
        marginTop: 48,
        flexDirection: 'row',
    },
    registerText: {
        marginLeft: 10,
        color: '#06D3F6',
        fontWeight: 'bold',
    },
    logoWrapper: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 70
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },

});