// components/PostCard.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function PostCard({ post, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Text>Title: {post.title}</Text>
        <Text>Content: {post.content}</Text>
        {/* Render images */}
        {post.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100 }} />
        ))}
      </View>
    </TouchableOpacity>
  );
}
