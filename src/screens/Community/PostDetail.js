import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet,TextInput } from 'react-native';
import dummyPosts from './dummyPosts.json'
import { useEffect, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { Button } from 'react-native-paper';
import CommentSection from './CommentSection';

const PostDetail = ({ route }) => {
  const {postId } = route.params;
//   const [postID, setPostID] = useState(postId);
//   setPostID(postId);
//   console.log('Recievd post Id fgg:' + postID)
//   console.log(postId+" post number hasd veeb clikced for deets")
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState('');
  const [commentDTOList, setCommentDTOList] = useState([]);
  const navigation = useNavigation();



  useEffect(() => {
    // console.log("Inside post Detail with post Id "+postId)
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/forum/post/fetch/" + postId, {
          headers: { Authorization: "Bearer " + token }
        });
        // console.log("Getting post deets"+response.data.payload)
        // console.log(response.data.payload.commentDTOList)
        setPost(response.data.payload);
        setCommentDTOList(response.data.payload.commentDTOList);
        console.log(commentDTOList)

        // console.log("Post details: "+post)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchData();
  }, []);


  const handleAddComment = () => {
    navigation.navigate('CreateComment', {postId, parentId: null})
  }



  return (
    <ScrollView>
      {post ? <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.category}>Posted in <Text style={styles.highlightedCategory}>{post.forumName}</Text></Text>
        <Text style={styles.poster}>by {post.userName}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.content}>{post.content}</Text>
        {post.images && post.images.map(image => (
          <Image key={image.id} source={{ uri: image.url }} style={styles.image} />
        ))}
        {post.tags && post.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View> : undefined}

      <View style={styles.commentSection}>
        <View style={styles.commentInputContainer}>
        <Button icon="plus" mode="contained" buttonColor='#978aff' onPress={handleAddComment}>
            Add a comment
        </Button>
        </View>
        {/* CommentItem/> */}
        {commentDTOList? <CommentSection commetDTOlist={commentDTOList}/>: undefined}
        
        {/* <CommentList postId={postId} /> */}
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    marginBottom: 5,
    color: 'gray',
  },
  highlightedCategory: {
    fontWeight: 'bold',
    color: '#b0d4f5', // Change color to your preferred highlight color
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
  content: {
    color: 'white',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
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
  commentInputContainer: {
    flex: 1,
    margin: 5,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  commentInput: {
    flex: 1,
    fontSize: 20,
    color: 'black',
  }
});

export default PostDetail;
