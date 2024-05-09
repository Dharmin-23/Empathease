import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { baseUrl } from '../../constants/Constants';
import { TouchableOpacity } from 'react-native';
const OtpVerification = ({ isVisible, onClose, onSuccess, userEmail }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleVerify = () => {
    const otpValue = otp.join('');
    console.log("Otp value to be verified" + otpValue)
    if (otpValue.length === 6) {  
      // Send OTP verification request to backend
      verifyOtp({ email: userEmail, otp: otpValue }) // Send the OTP as an object with 'otp' property
        .then((response) => {
          // console.log('After verifyotp is called'+response);
          if (response.title === "Success") {
            onSuccess(); // Call the parent component function on success
            onClose(); // Close the modal
          } else {
            alert('Invalid OTP. Please try again.'); // Notify user of invalid OTP
          }
        })
        .catch((error) => {
          console.error('Error verifying OTP:', error);
          alert('An error occurred while verifying OTP. Please try again later.');
        });
    } else {
      alert('Please enter a 6-digit OTP.');
    }
  };

  const verifyOtp = async (data) => {
    // const data = {email: userEmail, otp:}
    // console.log("Inside verifyOtp"+data)
    try {
      const response = await fetch(baseUrl + "/auth/verify", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Update to include email
      });
      return await response.json();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < 5) {
        refs[index + 1].current.focus();
      }
    }
  };

  const handleResend = async (otpData) => {
    try {
      const otpData = { email: userEmail };
      const res = await fetch(baseUrl + "/auth/resend-otp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpData),
      });
    } catch (error) {
      console.error('Error resending OTP:', error);
      throw error;
    }
  }
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter 6-digit OTP</Text>
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
        <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
              <Text style={{ color: "indigo" }}>Resend OTP</Text>
        </TouchableOpacity>
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
  resendButton: {
    alignItems:'flex-end',
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  resendText: {
    color: 'indigo',
  },
});

export default OtpVerification;
