import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, IconButton, Card, Divider } from 'react-native-paper';
import { Icon } from 'native-base';

const CommentCard = ({ username, content, postTime}) => {
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
      <Card.Content style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.postTime}>Posted {postTime}</Text>
        </View>
        <Text>{content}</Text>
      </Card.Content>
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
  content: {
    flexDirection: 'column',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: 'blue',
    fontSize:20,
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  replyButton: {
    textAlign: 'center',
    color: 'blue',
  },
});

export default CommentCard;
