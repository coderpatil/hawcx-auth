import 'react-native-gesture-handler';
import 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './config';

import Login from './src/Login';
import Dashboard from './src/Dashboard';
import Registration from './src/Registration';
import Header from './components/Header';

const Stack = createStackNavigator();

function App() {
  
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(user => {
        console.log("Auth state changed: ", user);
        onAuthStateChanged(user);
      });
      return () => subscriber(); // this is the cleanup, unsubscribing on unmount
    }, []);

    if (initializing) return null;

    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                {user ? (
                    <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerTitle: () => <Header name="Hawcx Dashboard"/>, headerStyle: { height: 150, backgroundColor: '#00e4d0', shadowColor: '#000', elevation: 25 } }} />

                ) : (
                    <>
                        <Stack.Screen name="Login" component={Login} options={{ headerTitle: () => <Header name="Hawcx"/>, headerStyle: { height: 150, backgroundColor: '#00e4d0', shadowColor: '#000', elevation: 25 } }} />
                        <Stack.Screen name="Registration" component={Registration} options={{ headerTitle: () => <Header name="Hawcx"/>, headerStyle: { height: 150, backgroundColor: '#00e4d0', shadowColor: '#000', elevation: 25 } }} />
                    </>
                )}
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default () => (
    <NavigationContainer>
        <App/>
    </NavigationContainer>
);

