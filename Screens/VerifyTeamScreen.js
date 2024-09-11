import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function VerifyTeamScreen({ route, navigation }) {
  const { formData, checklistData, checklist } = route.params || {};
  const [engineers, setEngineers] = useState([{ name: '', phoneNumber: '', showOtp: false, otp: '' }]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addEngineer = () => {
    setEngineers([...engineers, { name: '', phoneNumber: '', showOtp: false, otp: '' }]);
  };

  const handleInputChange = (index, name, value) => {
    const newEngineers = [...engineers];
    newEngineers[index][name] = value;
    setEngineers(newEngineers);
  };

  const toggleOtpField = (index) => {
    const newEngineers = [...engineers];
    newEngineers[index].showOtp = true;
    setEngineers(newEngineers);
  };

  const handleSubmit = async () => {
    try {
      // Prepare engineers data to be stored in Firestore
      const engineersData = engineers.map(engineer => ({
        name: engineer.name,
        phoneNumber: engineer.phoneNumber,
        otp: engineer.otp,
      }));

      // Prepare the complete data object
      const dataToSave = {
        ...formData,           // Spread form data from PermitToWorkScreen
        ...checklistData,      // Spread checklist data from PermitListScreen
        ...checklist,          // Spread checklist data from PermitListScreen2
        engineers: engineersData, // Add engineers data
        timestamp: serverTimestamp(), // Add server timestamp
      };

      // Reference to the Firestore collection
      const checklistRef = collection(db, 'permitlist');

      // Add the document to Firestore
      await addDoc(checklistRef, dataToSave);

      // Success message or navigation
      console.log('Success', 'Data has been successfully submitted!');
      setIsModalVisible(true); // Show success modal
      
    } catch (error) {
      console.log('Error', 'There was an issue submitting the form: ' + error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    // Optionally navigate to another screen
    navigation.navigate('SomeOtherScreen'); // Replace with your target screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Verify Team</Text>

      {engineers.map((engineer, index) => (
        <View key={index} style={styles.engineerContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#A0A0A0"
            value={engineer.name}
            onChangeText={(text) => handleInputChange(index, 'name', text)}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.phoneInput]}
              placeholder="Phone Number"
              placeholderTextColor="#A0A0A0"
              keyboardType="phone-pad"
              value={engineer.phoneNumber}
              onChangeText={(text) => handleInputChange(index, 'phoneNumber', text)}
            />
            <TouchableOpacity
              style={[styles.otpButton, engineer.showOtp && styles.disabledButton]}
              onPress={() => toggleOtpField(index)}
              disabled={engineer.showOtp}
            >
              <Ionicons
                name="checkmark-outline"
                size={24}
                color={engineer.showOtp ? '#A0A0A0' : '#3ba745'}
              />
            </TouchableOpacity>
          </View>
          {engineer.showOtp && (
            <TextInput
              style={styles.input}
              placeholder="OTP"
              placeholderTextColor="#A0A0A0"
              keyboardType="number-pad"
              value={engineer.otp}
              onChangeText={(text) => handleInputChange(index, 'otp', text)}
            />
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addEngineer}>
        <Ionicons name="add-circle-outline" size={32} color="#3ba745" />
        <Text style={styles.addText}>Add Site Engineer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#66C05D" />
            <Text style={styles.modalText}>Your Team has been successfully verified!</Text>
            <Text style={styles.modalPermitText}>Permit Number: 338/Nacelle/2024/028</Text>
            <Text style={styles.modalStatusText}>Status: Pending Approval</Text>
            <TouchableOpacity style={styles.okButton} onPress={handleCloseModal}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F4F8EC',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3ba745',
    textAlign: 'center',
    marginBottom: 40,
  },
  engineerContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  otpButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  addText: {
    color: '#3ba745',
    fontSize: 18,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#3ba745',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#66C05D',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalPermitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalStatusText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#66C05D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
