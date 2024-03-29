import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';

const Resources = () => {
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
      <Button>Helloe to Resources</Button>
      {/* You can add any content you want to display on the Resources */}
    </ImageBackground>
  );
};

export default Resources;