import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from "../config";

const Dashboard = () => {
  const [name, setName] = useState('');

  // change the password
  const changePassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
    .then(() => {
      alert('Password reset email sent')
    }).catch((error) => {
      alert(error.message)
    })
  }

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data()); // Assuming .data() returns the correct format
      } else {
        console.log('User does not exist');
      }
    }).catch(error => console.error("Error fetching user data:", error.message));
  }, []); // Dependency array

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Hello, {name.firstName} 
      </Text>
      <TouchableOpacity
        onPress={() => { changePassword() }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Change Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { firebase.auth().signOut(); }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
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
