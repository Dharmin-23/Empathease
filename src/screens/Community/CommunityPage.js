import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Center, Box, HStack, Menu, Divider, MenuItem } from 'native-base';
import { Heading } from 'native-base';
import { IconButton} from 'react-native-paper';
import { HamburgerIcon,Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';

// Importing dummy data from a JSON file
import dummyPosts from './dummyPosts.json';

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterType, setFilterType] = useState('recency');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    // Initialize posts with dummy data when component mounts
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
    return filteredPosts.map(post => (
      <Box key={post.id} bg="white" p="4" mb="4" borderRadius="md" shadow={1}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="md" mb="2">{post.title}</Heading>
          <Menu w="190" trigger={triggerProps => {
            return <TouchableOpacity {...triggerProps}>
            <HamburgerIcon />
          </TouchableOpacity>
          }}>
              <Menu.Item>Arial</Menu.Item>
              <Menu.Item>Nunito Sans</Menu.Item>
              <Menu.Item>Roboto</Menu.Item>
              <Menu.Item>Poppins</Menu.Item>
              <Menu.Item>SF Pro</Menu.Item>
              <Menu.Item>Helvetica</Menu.Item>
              <Menu.Item isDisabled>Sofia</Menu.Item>
              <Menu.Item>Cookie</Menu.Item>
            </Menu>
    
            
        
        </HStack>
        <Text>{post.content}</Text>
        {post.images && post.images.map(image => (
          <Image key={image.id} source={{ uri: image.url }} style={{ width: '100%', height: 200, resizeMode: 'cover', marginBottom: 10 }} />
        ))}
        {post.videos && post.videos.map(video => (
          <Video key={video.id} source={{ uri: video.url }} style={{ width: '100%', height: 200, marginBottom: 10 }} />
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleLike(post.id)}>
            <Icon as={Ionicons} name="heart-outline" size="sm" />
            </TouchableOpacity>
            <Text>{post.likes}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleFlag(post.id)}>
            <Icon as={Ionicons} name="flag-outline" size="sm" />
            </TouchableOpacity>
            <Text>Flag</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          {post.tags.map(tag => (
            <View key={tag} style={{ backgroundColor: 'grey', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 10, marginRight: 5, marginBottom: 5 }}>
              <Text style={{ color: 'white' }}>{tag}</Text>
            </View>
          ))}
        </View>
      </Box>
    ));
  };

  return (
    <ScrollView>
      <Center w="100%">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
            Community Page
          </Heading>

          
            
          <HStack space={3}>
          <Button leftIcon={<Icon as={Ionicons} name="add-outline" size="sm" />}>
            Create Post
          </Button>

          <Button leftIcon={<Icon as={Ionicons} name="funnel-outline" size="sm" />}>
          </Button>
          </HStack>
        </HStack>
      </Center>

      {renderPosts()}
    </ScrollView>
  );
};

export default CommunityPage;
