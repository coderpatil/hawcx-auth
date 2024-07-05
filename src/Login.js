import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const loginUser = async (email, password) => {
        setIsLoading(true);
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password);
          // Add navigation to dashboard or home screen here if needed
        } catch (error) {
        //   console.error("Login Error: ", error.message);
          alert("Failed to log in. Please check your credentials."); // More user-friendly message
        }
        setIsLoading(false);
    };

    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password reset email sent")
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Login</Text>
            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text>Show Password</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
                disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Login</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Don't have an account? Register Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { forgetPassword() }}
                style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Forget Password?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
    },
    textInput: {
        height: 50,
        width: 300,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center'
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    }
});

