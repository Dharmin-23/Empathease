// components/Comment.js
import React from 'react';
import { View, Text } from 'react-native';

export default function Comment({ comment }) {
  return (
    <View>
      <Text>{comment.text}</Text>
      {/* Render replies */}
      {comment.replies.map((reply, index) => (
        <Comment key={index} comment={reply} />
      ))}
    </View>
  );
}
