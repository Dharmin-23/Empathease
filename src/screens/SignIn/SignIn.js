import React from 'react';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ImageBackground } from 'react-native'; // Import ImageBackground
import { Center, Box, VStack, FormControl, Heading, Input, Button, HStack, Link, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import OtpVerification from './OtpVerification';
import axios from 'axios';
import { baseUrl } from '../../constants/Constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignIn = () => {
  const navigation = useNavigation();
  const [isUserNotExistPopupVisible, setUserNotExistPopupVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.navigate("AnimTab");
        } else {
          // token not found , show the login screen itself
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  
  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    try {
      res = await axios.post(baseUrl + "/auth/login", user);

      if (res.status === 200) {
        const token = res.data.payload.token;
        const username = res.data.payload.username;
        const userId = res.data.payload.id;
        
        AsyncStorage.setItem("username", username)
        AsyncStorage.setItem("authToken", token);
        AsyncStorage.setItem("userId", String(userId))
        
        navigation.navigate('AnimTab');
        setIsOtpVisible(true); // Show OTP verification modal
      }
      else{
        setUserNotExistPopupVisible(true);
      }
    } catch (error) {
      setErrorMessage('Invalid username or password. Please try again.'); // Set error message
    }
  };

  // Function to navigate to the registration screen
  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const handleOtpVerificationClose = () => {
    // Close the OTP verification popup
    setIsOtpVisible(false);
    navigation.navigate('AnimTab');
  };

  const UserNotExistPopup = (
    <Modal
      visible={isUserNotExistPopupVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setUserNotExistPopupVisible(false)}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text>User does not exist. Please try again.</Text>
          <TouchableOpacity onPress={() => setUserNotExistPopupVisible(false)}>
            <Text style={styles.popupCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ImageBackground source={require('../../assets/images/login-wallpaper.png')} style={styles.backgroundImage}>
      <ScrollView>
        <Center w="100%">
          <Box safeArea p="2" py="0" w="80%" maxW="290">
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: '100%', resizeMode: 'contain' }}
              alt='Bottom bc'
            />
            <Heading size="lg" fontWeight="600" color="coolGray.800" mt="-10" _dark={{ color: "warmGray.50" }}>
              Welcome
            </Heading>
            <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Enter your Username</FormControl.Label>
                <Input 
                  value={user.username} 
                  onChangeText={(value) => handleChange('username', value)} 
                  color="black"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <View style={styles.passwordInputContainer}>
                  <Input 
                    secureTextEntry={!showPassword}
                    value={user.password} 
                    onChangeText={(value) => handleChange('password', value)} 
                    type="password" 
                    color="black"
                  />
                  <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={toggleShowPassword} 
                  /> 
                </View>
                <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1">
                  Forget Password?
                </Link>
              </FormControl>
              <Button mt="2" colorScheme="indigo" onPress={handleSignIn}>
                Sign in
              </Button>
              <HStack mt="6" justifyContent="center">
                {/* <Text fontSize="sm" color="coolGray.600" _dark={{ color: "black.500" }}>
                  I'm a new user.{" "}
                </Text> */}
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={{ color: "indigo" }}>Don't have an account? Register now!</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </Box>

          <View>
            <Image
              source={require('../../assets/images/bottomart.png')}
              style={{ width: '100%', height: 100, resizeMode: 'contain' }}
              alt='le bhai bas'
            />
          </View>
        </Center>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupCloseButton: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, // Assuming you want a border under the password field
    borderBottomColor: 'gray', // You can adjust the color as needed
  },
  icon: {
    position: 'absolute',
    right: 10, // Adjust this value as needed to position the icon properly
  },
});

export default SignIn;
