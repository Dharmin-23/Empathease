import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Center, Box, VStack, FormControl, Heading, Input, Button, HStack, Link, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import OtpVerification from './OtpVerification';

const SignIn = () => {
  const navigation = useNavigation();
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  // Function to handle sign-in
  const handleSignIn = () => {
    // Perform sign-in logic here

    // After successful sign-in, navigate to the homepage
    setIsOtpVisible(true);
    // navigation.navigate('AnimTab');
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
    <Center w="100%">
      <Box safeArea p="2" py="0" w="80%" maxW="290">
        <Image
          source={require('../../assets/images/bottomart.png')}
          style={{ width: '100%', resizeMode: 'contain' }}
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
            <Input />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" />
            <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSignIn}>
            Sign in
          </Button>
          <OtpVerification isVisible={isOtpVisible} onClose={handleOtpVerificationClose} />
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
        />
      </View>
    </Center>
  );
};

export default SignIn;
