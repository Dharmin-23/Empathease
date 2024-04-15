import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import YoutubePlayer from "react-native-youtube-iframe";
import { View } from 'react-native';
import { useState, useCallback, useRef } from 'react';


const Resources = () => {

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


  // const navigation = useNavigation();

  // useEffect(() => {
  //   const navigateToNavbar = () => {
  //     navigation.navigate('Navbar'); // Navigate to the 'Navbar' screen
  //   };

  //   navigateToNavbar();
  // }, [navigation]);

  return (
    <View>
    <YoutubePlayer
      height={300}
      play={playing}
      videoId={"iee2TATGMyI"}
      onChangeState={onStateChange}
    />
    <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
  </View>
  );
};

export default Resources;