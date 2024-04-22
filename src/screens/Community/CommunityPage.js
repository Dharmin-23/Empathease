import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Center, Box, HStack, Menu, Divider, MenuItem, Heading, Button, Icon } from 'native-base';
import { IconButton} from 'react-native-paper';
import { HamburgerIcon} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Importing dummy data from a JSON file
import dummyPosts from './dummyPosts.json';

const CommunityPage = ({route}) => {
  const [posts, setPosts] = useState([]);
  const {forumName} = route.params; 
  console.log("Fname:"+forumName) 
  
  const navigation = useNavigation();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterType, setFilterType] = useState('recency');
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/forum/" + forumName, {
          headers: { Authorization: "Bearer " + token }
        });
        // console.log(response.data.payload)
        const posts = response.data.payload;
        // setCategories(response.data.payload);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error if needed
      }
    };

    
    // Initialize posts with dummy data when component mounts
    fetchData();
    setPosts(dummyPosts);
    setFilteredPosts(dummyPosts);
  }, []);

  

  

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === 'recency') {
      setFilteredPosts([...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } else if (type === 'likes') {
      setFilteredPosts([...posts].sort((a, b) => b.likes - a.likes));
    }
  };

  const handlePostDetail = (postId) => {
    // console.log(postId + "ka data retereive")
    navigation.navigate('PostDetail', {postId});
  };

  const handleCreatePost = () => {
    console.log("Create post clikced")
    navigation.navigate('CreatePost');
  }

  const handleLike = (postId) => {
    // Update like count for the post in state
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  const handleFlag = (postId) => {
    // Flag the post in state
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, flagged: true };
      }
      return post;
    });
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  const renderPosts = () => {
    return filteredPosts.map((post, index) => (
     
        <Box bg="white" p="4" mb={index === 0 ? "8" : "4"} borderRadius="md" shadow={1} marginLeft={2} marginRight={2}>
        <TouchableOpacity key={post.id} onPress={() => handlePostDetail(post.id)}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" mb="2">{post.title}</Heading>
          <Text style={styles.category}>Posted in <Text style={styles.highlightedCategory}>{post.category}</Text></Text>
        </HStack>
        <Text style={styles.poster}>by {post.originalposter}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.postContent}>{post.content}</Text>
        {post.images && post.images.map(image => (
          <Image key={image.id} source={{ uri: image.url }} style={{ width: '100%', height: 200, resizeMode: 'cover', marginBottom: 10 }} />
        ))}
        {post.videos && post.videos.map(video => (
          <Video key={video.id} source={{ uri: video.url }} style={{ width: '100%', height: 200, marginBottom: 10 }} />
        ))}
      </TouchableOpacity>

  
        <View style={styles.postFooter}>
          <TouchableOpacity onPress={() => handleLike(post.id)} style={styles.actionButton}>
            <Icon as={Ionicons} name="heart-outline" size={6} />
            <Text style={styles.likes}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFlag(post.id)} style={styles.actionButton}>
            <Icon as={Ionicons} name="flag-outline" size={6} />
          </TouchableOpacity>
        </View>
        <View style={styles.tagContainer}>
          {post.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </Box>
      
    ));
  };

  return (
    <ScrollView>
      <Center w="100%">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }} style={styles.heading}>
          Welcome to {forumName} community!
        </Heading>
      </Center>
      <HStack justifyContent="space-between" alignItems="center" style={styles.navbar}>
        <Button size="sm" onPress={handleCreatePost} colorScheme="indigo"  startIcon={<Icon as={Ionicons} name="add-outline" size="sm"/>}>
          Create Post
        </Button>

        
        <Button size="sm" colorScheme="indigo"  startIcon={<Icon as={Ionicons} name="funnel-outline" size="sm" />}>
          Filter
        </Button>
      </HStack>
      {renderPosts()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  navbar: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  category: {
    marginBottom: 5,
    color: 'gray',
  },
  highlightedCategory: {
    fontWeight: 'bold',
    color: 'red', // Change color to your preferred highlight color
  },
  poster: {
    marginBottom: 5,
    color: 'gray',
  },
  separator: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  postContent: {
    color: 'gray',
    marginBottom: 10,
  },
  postContent: {
    color: 'gray',
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: 'grey',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: 'white',
  },
  likes: {
    color: '#333',
  }
});

export default CommunityPage;
