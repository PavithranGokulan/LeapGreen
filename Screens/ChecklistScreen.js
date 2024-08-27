import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Lgelogo from '../Lgelogo';

const checklists = require('../Datas/checklists.json');

const ChecklistScreen = ({ route, navigation }) => {
  const { section } = route.params;
  const [checklistData, setChecklistData] = useState(checklists.sections[section] || []);

  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await AsyncStorage.getItem(section);
      if (savedData) {
        setChecklistData(JSON.parse(savedData));
      }
    };
    loadSavedData();
  }, [section]);

  const handleInputChange = (field, value, id) => {
    const updatedChecklist = checklistData.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setChecklistData(updatedChecklist);
  };

  const handleStatusChange = (value, id) => {
    const updatedChecklist = checklistData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: value,
          otherStatus: value === 'Other' ? item.otherStatus : '', // Clear otherStatus if not "Other"
        };
      }
      return item;
    });
    setChecklistData(updatedChecklist);
  };

  const validateAndSaveSection = async () => {
    const isValid = checklistData.every(item => 
      item.status.trim() !== '' &&
      (item.status !== 'Other' || item.otherStatus.trim() !== '')
    );

    if (!isValid) {
      Alert.alert('Validation Error', 'Please fill out the status for all checklist items.');
      return;
    }

    try {
      await AsyncStorage.setItem(section, JSON.stringify(checklistData));
      Alert.alert('Success', 'Section data saved successfully!');
      
    } catch (error) {
      console.error('Error saving section data:', error);
    }
    navigation.navigate('SectionOverview');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{section}</Text>
      <FlatList
        data={checklistData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.checklistItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Picker
              selectedValue={item.status}
              onValueChange={(value) => handleStatusChange(value, item.id)}
              style={styles.picker}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="OK" value="OK" />
              <Picker.Item label="Not OK" value="Not OK" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            {item.status === 'Other' && (
              <TextInput
                style={styles.input}
                placeholder="Specify status"
                value={item.otherStatus}
                onChangeText={(text) => handleInputChange('otherStatus', text, item.id)}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Remarks"
              value={item.remarks}
              onChangeText={(text) => handleInputChange('remarks', text, item.id)}
            />
            <TextInput
              style={styles.input}
              placeholder="Updated Remarks"
              value={item.updatedRemarks}
              onChangeText={(text) => handleInputChange('updatedRemarks', text, item.id)}
            />
          </View>
        )}
      />
      <Button title="Save Section" onPress={validateAndSaveSection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  checklistItem: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default ChecklistScreen;