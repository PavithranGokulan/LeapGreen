import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Lgelogo from '../Lgelogo';

export default function LoginEmployeeScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    if (username.trim() === '') {
      Alert.alert('Error', 'Please enter your phone number.');
      setIsLoading(false);
      return;
    }

    // Handle the OTP sending process here
    Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
    
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
    <Lgelogo/>

      {/* Center Image */}
      <Image
        source={require('../assets/lge.png')}
        style={styles.centerImage}
      />

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome!</Text>

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#7F7F7F"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Log in as Manager Text */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginManagerScreen')}>
        <Text style={styles.managerText}>Log in as Manager</Text>
      </TouchableOpacity>

      {/* Send OTP Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Sending OTP...' : 'Send OTP'}
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
    width: 400,
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
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
  managerText: {
    color: '#00A000',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
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
