import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'native-base';
import { Button } from 'react-native-paper';

const Community = () => {
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
     <Button>Hello to Community</Button>
      {/* You can add any content you want to display on the Community */}
    </ImageBackground>
  );
};

export default Community;