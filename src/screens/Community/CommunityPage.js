import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Center, Box, HStack, Divider, Heading, Button, Icon, Pressable } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../constants/Constants';
import Modal from 'react-native-modal';
import { VStack } from 'native-base';

const CommunityPage = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const { forumName } = route.params; 
  const navigation = useNavigation();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterType, setFilterType] = useState('recency');
  const [showErrorModalLike, setShowErrorModalLike] = useState(false);
  const [showErrorModalFlag, setShowErrorModalFlag] = useState(false);
  const [showFlagReasonModal, setShowFlagReasonModal] = useState(false);
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const [postIdToFlag, setPostIdToFlag] = useState(null);
  const [flagReason, setFlagReason] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/forum/" + forumName, {
          headers: { Authorization: "Bearer " + token }
        });
        setPosts(response.data.payload);
        setFilteredPosts(response.data.payload);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchData();
  }, []);

  const handleFilter = (type) => {
    setFilterType(type);
    const sortedPosts = [...posts];
    if (type === 'recency') {
      sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === 'likes') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }
    setFilteredPosts(sortedPosts);
  };

  const handlePostDetail = (postId) => {
    setTimeout(() => {
      navigation.navigate('PostDetail', { postId });
    }, 500);
  };

  const handleCreatePost = () => {
    navigation.navigate('CreatePost');
  };

  const handleLike = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(baseUrl + "/forum/like/" + postId, {
        headers: { Authorization: "Bearer " + token }
      });
      console.log("Post liked");
      
      const updatedPosts = posts.map(post => post.id === postId ? { ...post, liked: true } : post);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (error) {
      setShowErrorModalLike(true);
    }
  };

  const handleFlag = async (postId) => {
    const alreadyFlagged = flaggedPosts.includes(postId);
    if (alreadyFlagged) {
      setShowErrorModalFlag(true);
    } else {
      setShowFlagReasonModal(true);
      setPostIdToFlag(postId);
    }
  };

  const checkFlaggedPost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.get(baseUrl + "/forum/flagged/" + postId, {
        headers: { Authorization: "Bearer " + token }
      });
      return response.data.payload.flagged;
    } catch (error) {
      console.error('Error checking flagged post:', error);
      return false;
    }
  };

  const submitFlag = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(baseUrl + "/forum/flag/"+postIdToFlag, {
        reason: flagReason
      }, {
        headers: { Authorization: "Bearer " + token }
      });
      console.log("Post flagged");
      
      const updatedFlaggedPosts = [...flaggedPosts, postIdToFlag];
      setFlaggedPosts(updatedFlaggedPosts);
      setShowFlagReasonModal(false);
      
      const updatedPosts = posts.map(post => post.id === postIdToFlag ? { ...post, flagged: true } : post);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (error) {
      // console.error('Error flagging post', error);
      setShowErrorModalFlag(true);

    }
  };

  const handleRemoveFlag = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      console.log("Reomving flag of", postIdToFlag)
      const response = await axios.get(baseUrl + "/forum/flag-remove/"+postIdToFlag, {
        headers: { Authorization: "Bearer " + token }
      });
      console.log("Flag removed");
      
      const updatedFlaggedPosts = flaggedPosts.filter(id => id !== postIdToFlag);
      setFlaggedPosts(updatedFlaggedPosts);
      setShowErrorModalFlag(false);
      setShowFlagReasonModal
      
      const updatedPosts = posts.map(post => post.id === postIdToFlag ? { ...post, flagged: false } : post);
      setPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
    } catch (error) {
      console.error('Error removing flag from post', error);
    }
  };

  const renderPosts = () => {
    
    return filteredPosts.map((post) => (
      // const isFlagged = await checkFlaggedPost(post.id);
      <Box key={post.id} bg="white" p="4" mb="4" borderRadius="md" shadow={1}>
        <Pressable onPress={() => handlePostDetail(post.id)}>
          <Heading size="md" mb="2">{post.title} </Heading>
          <Text style={styles.category}>
            Posted in {post.forumName} 
            <Text style={styles.highlightedCategory}>{post.category}</Text>
          </Text>
          <Text style={styles.poster}>by {post.userName}</Text>
        </Pressable>
        <Divider mb="2" />
        <Text style={styles.postContent}>{post.content}</Text>
        <HStack justifyContent="space-between" alignItems="center">
            <Pressable onPress={() => handleLike(post.id)}>
              <HStack alignItems="center">
                <Icon as={Ionicons} name={post.liked ? "heart" : "heart-outline"} size="sm" color="blue.500" />
                <Text style={styles.likes}>{post.likes}</Text>
              </HStack>
            </Pressable>
            <Pressable onPress={() => handleFlag(post.id)}>
              <HStack alignItems="center">
                <Icon as={Ionicons} name={true ? "flag" : "flag-outline"} size="sm" color={true ? "red.500" : "blue.500"} />
                <Text style={styles.likes}>{post.flagNo}</Text>
              </HStack>
            </Pressable>
          </HStack>
      </Box>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Center>
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }} style={styles.heading}>
          Welcome to {forumName} Community!
        </Heading>
      </Center>
      <HStack justifyContent="space-between" alignItems="center" style={styles.navbar}>
        <Button size="sm" onPress={handleCreatePost} startIcon={<Icon as={Ionicons} name="add-outline" size="sm" />} colorScheme="indigo">
          Create Post
        </Button>
        <Button size="sm" onPress={() => setVisible(true)} startIcon={<Icon as={Ionicons} name="funnel-outline" size="sm" />} colorScheme="indigo">
          Filter
        </Button>
      </HStack>
      {renderPosts()}
      <Modal isVisible={showErrorModalLike}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>You have already liked this post!</Text>
          <Button onPress={() => setShowErrorModalLike(false)}>Close</Button>
        </View>
      </Modal>
      <Modal isVisible={showErrorModalFlag}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>You have already flagged this post!</Text>
          <VStack space={2} alignItems="center">
            <Button onPress={() => setShowErrorModalFlag(false)}>Close</Button>
            <Button onPress={handleRemoveFlag}>Remove Flag</Button>
          </VStack>
        </View>
      </Modal>
      <Modal isVisible={showFlagReasonModal}>
        <View style={styles.flagModalContent}>
          <Pressable onPress={() => setShowFlagReasonModal(false)} style={styles.closeIcon}>
            <Icon as={Ionicons} name="close" size="md" color="black" />
          </Pressable>
          <Text style={styles.modalText}>Enter reason for flagging the post:</Text>
          <TextInput
            style={styles.flagReasonInput}
            onChangeText={(text) => setFlagReason(text)}
            value={flagReason}
            placeholder="Enter reason..."
            multiline={true}
          />
          <Button onPress={submitFlag}>Submit</Button>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center',
    color:'white',
  },
  navbar: {
    marginBottom: 10,
  },
  category: {
    marginBottom: 5,
    color: 'gray',
  },
  highlightedCategory: {
    fontWeight: 'bold',
    color: 'red',
  },
  poster: {
    marginBottom: 5,
    color: 'gray',
  },
  postContent: {
    color: 'gray',
    marginBottom: 10,
  },
  likes: {
    marginLeft: 5,
    color:'grey'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  flagModalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'center',
    color: 'black',
  },
  flagReasonInput: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color:'black',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default CommunityPage;
