import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import YoutubePlayer from "react-native-youtube-iframe";
import { View , ScrollView} from 'react-native';
import { useState, useCallback, useRef } from 'react';
import { baseUrl } from '../../constants/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Resources = () => {
  

  const [playing, setPlaying] = useState(false);
  const [resource, setResource] =useState([]);
  useEffect(()=> {
    const fetchResources = async () => {
      try {
        
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/api/resource", {
          headers: { Authorization: "Bearer " + token }
        });
        console.log(response)
        const stringfyiedjson =JSON.parse(JSON.stringify(response))
        console.log(stringfyiedjson.data)
        setResource(stringfyiedjson.data.payload)
        // const resources = stringfyiedjson.data.payload;
        // console.log("Resources payload"+ resources)
        // setCategories(response.data.payload);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error if needed
      }
    };
    fetchResources();

  }, [])

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <ScrollView>
    {resource.map((video, index) => (
      <View key={index} style={{ marginBottom: 20 }}>
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={video.content}
          onChangeState={onStateChange}
        />
        
      </View>
    ))}
  </ScrollView>
  );
};

export default Resources;