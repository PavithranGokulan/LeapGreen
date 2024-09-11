import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../firebase'; // Import Firestore from your firebase.js file
import { doc, updateDoc } from 'firebase/firestore';
import Lgelogo from '../Lgelogo';


export default function PermitManagerScreen({ navigation }) {

  // Function to update the status in Firestore
  const handleStatusChange = async (permitId, newStatus) => {
    try {
      // Reference to the specific document in Firestore
      const permitRef = doc(db, 'permits', permitId); // Assuming 'permits' is your collection name

      // Update the status field of the document
      await updateDoc(permitRef, {
        status: newStatus,
      });

      console.log(`${permitId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Lgelogo/>

      {/* Adding space */}
      <View style={{ marginTop: 150 }} />

      {/* Search Field Placeholder (styled like the Select Permit Number picker) */}
      <View style={styles.pickerContainer}>
        <Text style={styles.searchPermitText}>Search Permit Number</Text>
      </View>

      {/* Pending Approval Section */}
      <Text style={styles.sectionTitle}>Pending Approval</Text>
      {['2024-cbe-301', '2024-cbe-304', '2024-cbe-306', '2024-cbe-307', '2024-cbe-308', '2024-cbe-315', '2024-cbe-316', '2024-cbe-320', '2024-cbe-321', '2024-cbe-325'].map((permit, index) => (
        <View key={index} style={styles.smallPermitContainer}>
          <Text style={styles.permitText}>{permit}</Text>
          <TouchableOpacity style={styles.smallAcceptButton} onPress={() => handleStatusChange(permit, 'Accepted')}>
            <Text style={styles.acceptText}>ACCEPT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallRejectButton} onPress={() => handleStatusChange(permit, 'Rejected')}>
            <Text style={styles.rejectText}>REJECT</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Past Permits Section */}
      <Text style={styles.sectionTitle}>Past Permits</Text>
      {[
        { id: '2024-cbe-301', status: 'APPROVED', color: 'green' },
        { id: '2024-cbe-304', status: 'REJECTED', color: 'red' },
        { id: '2024-cbe-306', status: 'REJECTED', color: 'red' },
        { id: '2024-cbe-308', status: 'REJECTED', color: 'red' },
        { id: '2024-cbe-315', status: 'APPROVED', color: 'green' }
      ].map((permit, index) => (
        <View key={index} style={styles.pastPermitContainer}>
          <Text style={styles.pastPermitText}>{permit.id}</Text>
          <FontAwesome name="check-circle" size={20} color={permit.color} />
          <Text style={[styles.pastPermitStatus, { color: permit.color }]}>{permit.status}</Text>
        </View>
      ))}
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
    alignItems: 'center',
    marginBottom: 20,
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
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchPermitText: {
    color: '#8c8c8c',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  smallPermitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  permitText: {
    fontSize: 14,
    flex: 1,
  },
  smallAcceptButton: {
    backgroundColor: '#28a745',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  smallRejectButton: {
    backgroundColor: '#dc3545',
    padding: 5,
    borderRadius: 5,
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  rejectText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  pastPermitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pastPermitText: {
    fontSize: 14,
    marginRight: 10,
    flex: 1,
  },
  pastPermitStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
