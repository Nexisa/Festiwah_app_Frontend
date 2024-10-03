import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
const SignUpScreen = () => {
    const handleGoogleSignIn = async () => {
        // Implement Google Sign-In logic here
    };

    const handleFacebookSignIn = async () => {
        // Implement Facebook Sign-In logic here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
                <AntDesign name="google" size={24} color="white" />
                <Text style={styles.buttonText}>Sign Up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleFacebookSignIn}>
                <FontAwesome name="facebook" size={24} color="white" />
                <Text style={styles.buttonText}>Sign Up with Facebook</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        marginBottom: 40,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '80%',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
});

export default SignUpScreen;