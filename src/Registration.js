import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../config';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const registerUser = async (email, password, firstName, lastName) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://hawcx-7b708.firebaseapp.com',
            });
            alert('Verification email sent');
            await firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
                firstName,
                lastName,
                email
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Register Here!!</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    onChangeText={setFirstName}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    onChangeText={setLastName}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={setPassword}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 23,
        marginBottom: 20,
    },
    formContainer: {
        marginTop: 20,
        width: '80%',
    },
    textInput: {
        height: 50,
        width: '100%',
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        height: 50,
        width: '50%',
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'white'
    }
});
