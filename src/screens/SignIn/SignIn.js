import React from 'react';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Center, Box, VStack, FormControl, Heading, Input, Button, HStack, Link, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import OtpVerification from './OtpVerification';
import axios from 'axios';
import { baseUrl } from '../../constants/Constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';



const SignIn = () => {
  var res = 1;
  const navigation = useNavigation();
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
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    console.log(user)
    

    
    try {
      res = await axios.post(baseUrl + "/auth/login", user);

      
      if (res.status === 200) {
        console.log("login nresponse"+res.data)
        const token = res.data.payload.token;
        const username = res.data.payload.username;
        console.log("Inside Signin "+ res.data.payload )
      
        
        AsyncStorage.setItem("username", username)
        AsyncStorage.setItem("authToken", token);
        navigation.navigate('AnimTab');
        setIsOtpVisible(true); // Show OTP verification modal
      }
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.'); // Set error message
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

  return (
    <ScrollView>
    <Center w="100%">
      <Box safeArea p="2" py="0" w="80%" maxW="290">
        <Image
          source={require('../../assets/images/bottomart.png')}
          style={{ width: '100%', resizeMode: 'contain' }}
          alt='Bottom bc'
        />
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input 
            value={user.email} 
            onChangeText={(value) => handleChange('email', value)} 
            color="white"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input 
            value={user.password} 
            onChangeText={(value) => handleChange('password', value)} 
            type="password" 
            color="white"/>
            <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSignIn}>
            Sign in
          </Button>
          {/* <OtpVerification isVisible={isOtpVisible} onClose={handleOtpVerificationClose} /> */}
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
              I'm a new user.{" "}
            </Text>
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
  );
};

export default SignIn;
