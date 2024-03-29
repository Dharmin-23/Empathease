import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const Expert = () => {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   const navigateToNavbar = () => {
  //     navigation.navigate('Navbar'); // Navigate to the 'Navbar' screen
  //   };

  //   navigateToNavbar();
  // }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={{ flex: 1 }}
    >
      <Button>Hello to Expert</Button>
      {/* You can add any content you want to display on the Expert */}
    </ImageBackground>
  );
};

export default Expert;