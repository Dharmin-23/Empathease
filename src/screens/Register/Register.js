import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Center, Box, VStack, FormControl, Input, Button, HStack, Link, Image, Heading, Select } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [sexuality, setSexuality] = useState('');

  const handleSubmit = () => {
    // Handle form submission
    console.log('Submitted:', { name, email, age, gender, sexuality });
  };

  const handleSignIn = () => {
    // Navigate back to the sign-in page
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
            <FormControl.Label>Name</FormControl.Label>
            <Input value={name} onChangeText={setName} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={email} onChangeText={setEmail} keyboardType="email-address" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Age</FormControl.Label>
            <Input value={age} onChangeText={setAge} keyboardType="numeric" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Gender</FormControl.Label>
            <Select
              selectedValue={gender}
              minWidth={200}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Select.Item label="Male" value="male" />
              <Select.Item label="Female" value="female" />
              <Select.Item label="Other" value="other" />
            </Select>
          </FormControl>
          <FormControl>
            <FormControl.Label>Sexuality</FormControl.Label>
            <Select
              selectedValue={sexuality}
              minWidth={200}
              onValueChange={(itemValue) => setSexuality(itemValue)}
            >
              <Select.Item label="Heterosexual" value="heterosexual" />
              <Select.Item label="Homosexual" value="homosexual" />
              <Select.Item label="Bisexual" value="bisexual" />
              <Select.Item label="Other" value="other" />
            </Select>
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
    </Center>
  );
};

export default Register;
