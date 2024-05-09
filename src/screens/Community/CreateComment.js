import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios'; // Import Axios library
import { baseUrl } from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateComment = ({ route }) => {
  const { colors } = useTheme();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { postId, parentId } = route.params;

  // Function to handle submitting the comment
  const submitComment = async () => {
    console.log("Post ID" + postId + "Content: " + comment + "ParentID : " + parentId)
    setLoading(true); // Set loading state to true
    const token = await AsyncStorage.getItem("authToken");

    try {
      const response = await axios.post(baseUrl + "/forum/comment/" + postId, {
        content: comment,
        parentCommentId: parentId,
      }, {
        headers: { Authorization: "Bearer " + token }
      });

      // Check response status and handle success or error
      if (response.status === 200) {
        // Reset comment input after successful submission
        setComment('');
        Alert.alert('Success', 'Comment added successfully');
      } else {
        Alert.alert('Error', 'Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('Error', 'Failed to add comment');
    }

    setLoading(false); // Set loading state back to false after request completes
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor: 'white', borderColor: colors.border, color: colors.text }
        ]}
        placeholder="Add a comment"
        placeholderTextColor={colors.text}
        onChangeText={setComment}
        maxLength={2000}
        autoCorrect={false}
        value={comment}
        multiline={true} // Enable multiline
        numberOfLines={4} // Set the number of lines
      />
      <TouchableOpacity
        onPress={submitComment}
      >
        <Entypo
          style={{ marginRight: 5 }}
          name="direction"
          size={20}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    paddingHorizontal: 5,
    elevation: 3,
    backgroundColor: 'white', // Set background color to white
  },
  textInput: {
    flex: 1,
    margin: 5,
    height: 100, // Increase height
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'lightgray', // Add border color
  },
});

export default CreateComment;
