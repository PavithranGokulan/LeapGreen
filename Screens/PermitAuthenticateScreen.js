import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Lgelogo from '../Lgelogo';

export default function PermitAuthenticateScreen() {
  const [permitNumber, setPermitNumber] = useState('');
  const [verifiedPermit, setVerifiedPermit] = useState(null);
  const [isDropdownFocused, setDropdownFocused] = useState(false);
  const navigation = useNavigation();

  const checkPermitNumber = async (number) => {
    if (number.trim() === '') {
      setVerifiedPermit(null);
      return;
    }

    try {
      const permitRef = doc(db, 'permits', number);
      const permitSnap = await getDoc(permitRef);

      if (permitSnap.exists() && permitSnap.data().verified) {
        setVerifiedPermit(number);
      } else {
        setVerifiedPermit(null);
      }
    } catch (error) {
      console.error('Error checking permit:', error);
      Alert.alert('Error', 'An error occurred while checking the permit.');
    }
  };

  const handlePermitInputChange = (text) => {
    setPermitNumber(text);
    checkPermitNumber(text);
    setDropdownFocused(false); // Reset focus when input changes
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'ArrowDown' && verifiedPermit) {
      setDropdownFocused(true);
    } else if (nativeEvent.key === 'Enter' && isDropdownFocused) {
      setDropdownFocused(false); // Reset focus after selection
    }
  };

  const handleDropdownPress = () => {
    if (verifiedPermit) {
      // Navigate to the checklist screen when the dropdown is pressed
      navigation.navigate('ChecklistSection');
    }
  };

  const handleCreateNewPermit = () => {
    // Navigate to the PermitListScreen when the "Create New Permit" button is pressed
    navigation.navigate('PermitToWork');
  };

  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      setDropdownFocused(false); // Hide dropdown when the keyboard is dismissed
    });

    return () => {
      keyboardListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Lgelogo />

      <View style={{ width: '100%' }}>
        <TextInput
          placeholder="Enter Permit Number"
          style={styles.input}
          placeholderTextColor="#8c8c8c"
          value={permitNumber}
          onChangeText={handlePermitInputChange}
          onKeyPress={handleKeyPress}
        />

        {verifiedPermit && (
          <TouchableOpacity
            style={[
              styles.dropdownContainer,
              isDropdownFocused && styles.dropdownFocused, // Apply focused style if focused
            ]}
            onPress={handleDropdownPress} // Navigate on press
          >
            <Text style={styles.dropdownText}>{verifiedPermit}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.subtitle}>Can't find your permit?</Text>
      <TouchableOpacity style={styles.button} onPress={handleCreateNewPermit}>
        <Text style={styles.buttonText}>Create New Permit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#00A86B',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    color: '#000000',
  },
  button: {
    backgroundColor: '#66C05D',
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    marginTop: 30,
    marginBottom: 1,
    color: '#8c8c8c',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  dropdownContainer: {
    marginTop: -5, // Align it right below the TextInput
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E0F2E9',
    borderColor: '#00A86B',
    borderWidth: 1,
    width: '100%',
  },
  dropdownText: {
    fontSize: 16,
    color: '#00A86B',
    fontWeight: 'bold',
  },
  dropdownFocused: {
    backgroundColor: '#C3E6CB', // Change background when focused
  },
});
