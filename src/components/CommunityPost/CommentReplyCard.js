import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, IconButton, Card, Divider } from 'react-native-paper';
import TextInput from 'react-native-paper';

const CommentReplyCard = ({ username, content,postTime, parentUsername, parentContent }) => {
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    setReplying(true);
  };

  const handleLike = () => {
    // Implement like functionality
  };

  const handleSubmitReply = () => {
    // Implement reply functionality
    setReplying(false);
    setReplyContent('');
  };

  const handleFlag = () => {
    // Implement flag functionality
  };

  return (
    <Card style={styles.card}>
      <View style={styles.commentContainer}>
        {parentUsername && parentContent && (
          <View style={styles.parentComment}>
            <View style={styles.parentBorder} />
            <Text style={styles.parentUsername}>{parentUsername}: </Text>
            <Text numberOfLines={3} ellipsizeMode="tail">{parentContent}</Text>
          </View>
        )}
        <View style={styles.currentComment}>
          <Text style={styles.username}>{username}: </Text>
          <Text style={styles.postTime}>Posted {postTime}</Text>
        </View>
        <View style={styles.currentComment}>
          <Text>{content}</Text>
        </View>
      </View>
      <Card.Actions>
        <IconButton icon="reply" onPress={handleReply} />
        <IconButton icon="heart-outline" onPress={handleLike} />
        <IconButton icon="flag-outline" onPress={handleFlag} />
      </Card.Actions>
      {replying && (
        <View style={styles.replyContainer}>
          <Divider />
          <View style={styles.replyInputContainer}>
            <Avatar.Icon size={24} icon="account" />
            <TextInput
              style={styles.replyInput}
              placeholder="Type your reply here..."
              value={replyContent}
              onChangeText={setReplyContent}
            />
          </View>
          <TouchableOpacity onPress={handleSubmitReply}>
            <Text style={styles.replyButton}>Reply</Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'column',
  },
  parentComment: {
    backgroundColor: '#243652',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    borderLeftWidth: 2, // Add a thin border on the left side
    borderColor: '#ccc', // Border color
    paddingLeft: 5, // Add padding to separate border from text
  },
  parentBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2, // Border width
    backgroundColor: '#b0d4f5', // Border color
  },
  parentUsername: {
    fontWeight: 'bold',
    color: '#fff', // Change username color
  },
  currentComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: 'blue', // Change username color
    fontSize: 20,
  },
  postTime: {
    color: '#666',
  },
  replyContainer: {
    marginTop: 10,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  replyInput: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#666763',
    borderRadius: 5,
    padding: 5,
  },
  replyButton: {
    textAlign: 'center',
    color: 'blue',
  },
});

export default CommentReplyCard;
