import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Button, TextInput } from 'react-native-paper';
import { UserType } from '../../UserContext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const UserProfile = ({ isVisible, onClose, onLogout}) => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserType);
  // console.log(user)
  const [username, setUsername] = useState('');
  
  useEffect(()=>{
    // console.log("Userprofile useeffect")
    fetchUsername();
  }, [fetchUsername]);

  const fetchUsername = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      // console.log("Inside fetchusename"+username)
      setUsername(username); // Update the state with the fetched username
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  }

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const handleLogout = async () => {
    try {
      // Delete session token from AsyncStorage
      await AsyncStorage.removeItem("authToken");
      // Navigate to SignIn page
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

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
        <Text style={styles.username}>{username}</Text>
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

        {/* Logout Button */}
        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>Logout</Button>
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
    color: "black"
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default UserProfile;
