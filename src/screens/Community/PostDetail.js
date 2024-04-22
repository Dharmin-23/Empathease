import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet,TextInput } from 'react-native';
import dummyPosts from './dummyPosts.json'
import { useEffect, useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommentItem from '../../components/CommunityPost/CommentItem';

import { Button } from 'react-native-paper';

const PostDetail = ({ route }) => {
  const {postId } = route.params;
//   const [postID, setPostID] = useState(postId);
//   setPostID(postId);
//   console.log('Recievd post Id fgg:' + postID)
//   console.log(postId+" post number hasd veeb clikced for deets")
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [comment, setComment] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // console.log("useEffect triggered");
    // console.log('Recievd post Id fgg:' + postId)

    getPostData()
  }, [postId])


  const handleAddComment = () => {
    navigation.navigate('CreateComment')
  }
  const getPostData = useCallback(async () => {


    try {
        setIsLoading(true);
        // Find the post with the matching postId
        const postData = dummyPosts.find(item => item.id === postId);
        if (postData) {
          // If the post is found, set it in the state
        //   console.log(postData);
          setPost(postData);
        } else {
          // Handle case when post is not found
          console.log(`Post with postId ${postId} not found`);
        }
      } catch (error) {
        // Handle any errors that occur during the retrieval
        console.error('Error retrieving post data:', error);
      } finally {
        // Ensure loading state is set to false regardless of success or failure
        setIsLoading(false);
      }
    // const { data } = await axios.get(`post/${postId}`)
    // setIsLoaading(true)
    // console.log('Inside getPOstData!! with postID'+postId)
    
    
    // console.log("!!!"+dummyPosts)
    // setPost(postData)
    // setIsLoaading(false)
  }, [postId])
  
//   useEffect(() => {
//     console.log("Inside useEffect postId:", postID);
//   }, [postID]);



  return (
    <ScrollView>
      {post ? <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.category}>Posted in <Text style={styles.highlightedCategory}>{post.category}</Text></Text>
        <Text style={styles.poster}>by {post.originalposter}</Text>
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
        <Button icon="plus" mode="contained" buttonColor='#483d8b' onPress={handleAddComment}>
            Add a comment
        </Button>
        </View>
        {/* CommentItem/> */}
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
  content: {
    color: 'gray',
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
