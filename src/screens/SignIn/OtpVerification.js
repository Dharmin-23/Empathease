import { Center } from 'native-base';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const OtpVerification = ({ isVisible, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleVerify = () => {
    // Implement your OTP verification logic here
    console.log('Verifying OTP:', otp.join(''));
    // Close the modal after verification
    onClose();
  };

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < 3) {
        refs[index + 1].current.focus();
      }
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      
      <View style={styles.container}>
        <Text style={styles.title}>Enter 4-digit OTP</Text>
        <Text style={styles.infoText}>An OTP has been sent to the registered email</Text>
        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => handleChange(index, value)}
              value={digit}
              ref={refs[index]}
            />
          ))}
        </View>
        <Button title="Verify" onPress={handleVerify} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black', // Change text color to black
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginRight: 5,
    textAlign: 'center',
    backgroundColor: 'transparent', // Transparent background
    color: 'black', // Text color
  },
});

export default OtpVerification;
