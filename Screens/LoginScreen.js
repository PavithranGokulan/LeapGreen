Login.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { db } from './firebase'; // Ensure the path is correct
import { doc, getDoc } from 'firebase/firestore';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both username and password.');
      setIsLoading(false);
      return;
    }

    try {
      // Assuming 'users' collection and documents have 'name' and 'password' fields
      const userRef = doc(db, 'users', username);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists() && userSnap.data().password === password) {
        Alert.alert('Success', 'Login successful!');
        // Navigate to another screen or handle successful login here
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred while trying to log in.');
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Logo at the Top Right */}
      <Image
        source={require('./assets/lge_logo.png')}
        style={styles.logo}
      />

      {/* New Image below Logo */}
      <Image
        source={require('./assets/lge.jpeg')}
        style={styles.centerImage}
      />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome!</Text>

      {/* Username/Email/Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Username, Email or Phone Number"
        placeholderTextColor="#7F7F7F"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7F7F7F"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 30,
    position: 'absolute',
    top: 60,
    right: 10,
  },
  centerImage: {
    width: 350, // Set your desired width for the image
    height: 200, // Set your desired height for the image
    alignSelf: 'center',
    marginBottom:20, // Space between the image and the welcome text
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00A000',
    textAlign: 'left',
    width: '100%',
    marginBottom: 1,
  },
  input: {
    height: 50,
    borderColor: '#00A000',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '100%',
    color: '#000000',
  },
  loginButton: {
    backgroundColor: '#00A000',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
