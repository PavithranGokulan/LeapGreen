import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

export default function PermitScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/lge_logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Adding space before the picker */}
      <View style={{ marginTop: 150 }} />

      {/* Permit Number Picker */}
      <View style={styles.pickerContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="Select Permit Number" value="" />
          {/* Add your picker items here */}
        </Picker>
      </View>

      {/* Adding space before the button */}
      <View style={{ marginTop: 50 }} />

      {/* Create New Permit Button */}
      <Text style={styles.textCenter}>Can't find your permit?</Text>
      <TouchableOpacity style={styles.createPermitButton} onPress={() => { /* Add your onPress function here */ }}>
        <Text style={styles.createPermitButtonText}>Create New Permit</Text>
      </TouchableOpacity>

      {/* Ongoing Permit */}
      <Text style={styles.sectionTitle}>On Going</Text>
      <View style={styles.permitContainer}>
        <Text style={styles.permitText}>2024/CBE/301</Text>
        <View style={styles.permitStatus}>
          <FontAwesome name="check-circle" size={20} color="green" />
          <Text style={styles.statusText}>APPROVED</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.closePermitButton} onPress={() => { /* Add your onPress function here */ }}>
          <FontAwesome name="times-circle" size={16} color="green" />
          <Text style={styles.closePermitText}>Close permit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelPermitButton} onPress={() => { /* Add your onPress function here */ }}>
          <FontAwesome name="times-circle" size={16} color="red" />
          <Text style={styles.cancelPermitText}>Cancel permit</Text>
        </TouchableOpacity>
      </View>

      {/* History */}
      <Text style={styles.sectionTitle}>History:</Text>
      <View style={styles.historyContainer}>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>2024/CBE/301</Text>
          <FontAwesome name="check-circle" size={20} color="green" />
          <Text style={styles.statusText}>APPROVED</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>2024/CBE/304</Text>
          <FontAwesome name="times-circle" size={20} color="red" />
          <Text style={styles.statusRejected}>REJECTED</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>2024/CBE/306</Text>
          <FontAwesome name="times-circle" size={20} color="red" />
          <Text style={styles.statusCancelled}>CANCELLED</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>2024/CBE/307</Text>
          <FontAwesome name="times-circle" size={20} color="gray" />
          <Text style={styles.statusClosed}>CLOSED</Text>
        </View>
        <View style={styles.historyItem}>
          <Text style={styles.historyText}>2024/CBE/308</Text>
          <FontAwesome name="times-circle" size={20} color="red" />
          <Text style={styles.statusRejected}>REJECTED</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => { /* Add your onPress function here */ }}>
        <Text style={styles.viewMoreText}>View More...</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  logo: {
    width: 200,
    height: 30,
    position: 'absolute',
    top: 50,
    right: 10,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderColor: '#00A86B',
    borderWidth: 1,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#8c8c8c',
  },
  textCenter: {
    textAlign: 'left',
    marginBottom: 10,
    color: '#8c8c8c',
  },
  createPermitButton: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  createPermitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  permitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  permitText: {
    fontSize: 14,
    marginRight: 10,
  },
  permitStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  closePermitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C3E6CB',
    padding: 10,
    borderRadius: 5,
  },
  closePermitText: {
    color: 'green',
    marginLeft: 5,
  },
  cancelPermitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8D7DA',
    padding: 10,
    borderRadius: 5,
  },
  cancelPermitText: {
    color: 'red',
    marginLeft: 5,
  },
  historyContainer: {
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyText: {
    fontSize: 14,
    marginRight: 10,
  },
  statusRejected: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 5,
  },
  statusCancelled: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 5,
  },
  statusClosed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginLeft: 5,
  },
  viewMoreText: {
    color: '#2E8B57',
    textAlign: 'center',
  },
});
