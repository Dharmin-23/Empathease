import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Button, TextInput } from 'react-native-paper';

const UserProfile = ({ isVisible, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handlePasswordChange = () => {
    // Implement your logic to change the password
    console.log('Changing password:', password);
    // Close the modal after changing the password
    setShowPasswordModal(false);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Image source={require('../../assets/images/avatar.png')} style={styles.profilePic} />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.email}>johndoe@example.com</Text>
        <TouchableOpacity onPress={() => setShowPasswordModal(true)}>
          <Text style={styles.password}>********</Text>
        </TouchableOpacity>

        {/* Change Password Modal */}
        <Modal isVisible={showPasswordModal} onBackdropPress={() => setShowPasswordModal(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              label="Current Password"
              value={password}
              onChangeText={setPassword}
            />
            <Button mode="contained" onPress={handlePasswordChange}>Change Password</Button>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    text: {
      color: 'black', // Set text color to black
    },
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'black',
    },
    email: {
      fontSize: 16,
      marginBottom: 5,
      color: 'black',
    },
    password: {
      fontSize: 16,
      marginBottom: 20,
      textDecorationLine: 'underline',
      color: 'blue',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      width: '100%',
      marginBottom: 20,
    },
  });
  

export default UserProfile;
