import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, View, Image, Alert } from 'react-native';
import Lgelogo from './Lgelogo';

export default function PermitToWorkScreen({ navigation }) {
  // State to track the input values
  const [form, setForm] = useState({
    site: '',
    location: '',
    workArea: '',
    windSpeed: '',
    name: '',
    numberOfPersons: '',
    descriptionOfWork: '',
  });

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // Function to handle the "Next" button press
  const handleNext = () => {
    // Check if all fields are filled
    if (Object.values(form).every(value => value.trim())) {
      navigation.navigate('Permitlist'); // Navigate to the Checklist screen
    } else {
      Alert.alert('Error', 'Please fill in all fields before proceeding.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Lgelogo />

      {/* Title */}
      <Text style={styles.titleText}>Permit to Work</Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Site"
        placeholderTextColor="#A3D59B"
        style={styles.input}
        value={form.site}
        onChangeText={(text) => handleInputChange('site', text)}
      />
      <TextInput
        placeholder="Location"
        placeholderTextColor="#A3D59B"
        style={styles.input}
        value={form.location}
        onChangeText={(text) => handleInputChange('location', text)}
      />
      <TextInput
        placeholder="Work Area"
        placeholderTextColor="#A3D59B"
        style={styles.input}
        value={form.workArea}
        onChangeText={(text) => handleInputChange('workArea', text)}
      />
      <TextInput
        placeholder="Wind Speed"
        placeholderTextColor="#A3D59B"
        style={styles.input}
        value={form.windSpeed}
        onChangeText={(text) => handleInputChange('windSpeed', text)}
      />
      <TextInput
        placeholder="Name"
        placeholderTextColor="#A3D59B"
        style={styles.input}
        value={form.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        placeholder="No. of Persons"
        placeholderTextColor="#A3D59B"
        style={styles.input}
        value={form.numberOfPersons}
        onChangeText={(text) => handleInputChange('numberOfPersons', text)}
      />
      <TextInput
        placeholder="Description of Work"
        placeholderTextColor="#A3D59B"
        style={styles.input}
        value={form.descriptionOfWork}
        onChangeText={(text) => handleInputChange('descriptionOfWork', text)}
      />

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleNext} // Call the handleNext function
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#66C05D',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 80,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#A3D59B',
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
    paddingVertical: 1,
  },
  button: {
    backgroundColor: '#66C05D',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
