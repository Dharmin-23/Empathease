import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Resources = () => {
  const [playing, setPlaying] = useState(false);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/api/resource", {
          headers: { Authorization: "Bearer " + token }
        });
        console.log(response.data.payload)
        setResources(response.data.payload);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // Filter resources based on search query
  const filteredResources = resources.filter(resource => resource.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <ScrollView>
      <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />

        <TextInput
          style={styles.searchInput}
          placeholder="Search videos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* Add any search button or icon here if needed */}
      </View>
      {resources ? resources.map((video, index) => (
        
        
        <View key={index} style={styles.videoContainer}>

          <Text style={styles.videoName}>{video.name}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tagLabel}>Tags:</Text>
            
            {video.tag.split(",").map((tag, tagIndex) => (
              <View key={tagIndex} style={styles.tag}>
                <Text style={styles.tagText}>{tag.trim()}</Text>
              </View>
            ))}
          </View>

          <YoutubePlayer
            height={200}
            play={playing}
            videoId={video.content}
            onChangeState={onStateChange}
          />
         
        </View>
      )): undefined}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,

  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchIcon: {
    marginRight:10,
  },
  videoContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    color:'white',
  },
  videoName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'dodgerblue'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagLabel: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  tag: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: 'black',
  },
});

export default Resources;
