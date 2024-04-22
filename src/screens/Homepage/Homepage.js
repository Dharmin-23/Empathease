import React from 'react';
import { ImageBackground, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Avatar, Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import UserProfile from '../UserProfile';
import { useState } from 'react';

const Homepage = () => {
  const navigation = useNavigation();
  const [showProfileModal, setShowProfileModal] = useState(false);

  // const navigateToProfile = () => {
  //   navigation.navigate('UserProfile'); // Navigate to the 'Profile' screen
  // };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={{ flex: 1 }}
    >
     

      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>"Believe you can and you're halfway there."</Text>
      </View>

      {/* Content */}
     
      {/* You can add any content you want to display on the Homepage */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 20, // Adjust this value as needed
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
  quoteContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  quote: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'black',
  },
});

export default Homepage;
