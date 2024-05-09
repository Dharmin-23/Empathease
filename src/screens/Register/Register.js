import React, { useState } from 'react';
import { Center, Box, VStack, FormControl, Input, Button, HStack, Link, Heading } from 'native-base';
import axios from 'axios'; // Import Axios
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../constants/Constants';
import OtpVerification from '../SignIn/OtpVerification';

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });

  var res = 1;

  const navigation = useNavigation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // State to store user email

  function handleChange(name, value) {
    setUser({
      ...user,
      [name]: value,
    });
  }
  
  async function handleSubmit() {
    setFormSubmitted(true);
  
    const isFormValid = Object.values(user).every((value) => value !== "") || !formSubmitted;
  
    if (!isFormValid) {
      alert("Error !!!. Please fill out all fields");
    } else {
      try {
        res = await axios.post(baseUrl + "/auth/register", user);
        // console.log(res)
        // setOtpVisible(true);
    

        // console.log(res);
        // setUserEmail(user.email);

        if (res.status === 200) {
          // Registration successful, show success message or navigate to another screen
          console.log("Registration successful!");
          setUserEmail(user.email);
          setOtpVisible(true); // Optionally show OTP verification modal
        } else {
          // Handle unexpected response status codes
          console.error("Unexpected response status:", res.status);
          alert("Error !!!. Registration failed. Please try again.");
        }

      } catch (error) {
        console.log(res)
        console.log(user);
        console.error("Error in registration:", error);
        alert("Error !!!. Registration failed. Please try again.");
      }
    }
  }

  const handleSignIn = () => {
    // Navigate back to the sign-in page
    navigation.navigate('SignIn');
  };

  const handleOtpVerificationSuccess = () => {
    setOtpVisible(false);
    navigation.navigate('SignIn');
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
          Register
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <Input value={user.firstName} onChangeText={(value) => handleChange('firstName', value)} color="white"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input value={user.lastName} onChangeText={(value) => handleChange('lastName', value)} color="white"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={user.email} onChangeText={(value) => handleChange('email', value)} keyboardType="email-address" color="white" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Username</FormControl.Label>
            <Input value={user.username} onChangeText={(value) => handleChange('username', value)} color="white"/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={user.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry // This hides the input characters
              color="white"
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
            Register
          </Button>
          <HStack mt="6" justifyContent="center">
            <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={handleSignIn}>
              Already have an account? Sign In!
            </Link>
          </HStack>
        </VStack>
      </Box>

      <OtpVerification isVisible={otpVisible} onClose={() => setOtpVisible(false)} userEmail={userEmail} onSuccess={handleOtpVerificationSuccess} />
    </Center>
  );
};

export default Register;
