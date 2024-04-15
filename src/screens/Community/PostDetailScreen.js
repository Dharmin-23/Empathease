// screens/PostDetailScreen.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Comment from '../components/Comment';
import HamburgerMenu from '../components/HamburgerMenu';

export default function PostDetailScreen({ route }) {
  const { post } = route.params;

  const handleFlag = () => {
    // Handle flagging the post
  };

  const handleEdit = () => {
    // Handle editing the post
  };

  const handleDelete = () => {
    // Handle deleting the post
  };

  return (
    <View>
      {/* Post details */}
      <View>
        <Text>Title: {post.title}</Text>
        <Text>Content: {post.content}</Text>
        {/* Render images */}
        {post.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100 }} />
        ))}
        {/* Hamburger menu */}
        <HamburgerMenu onFlag={handleFlag} onEdit={handleEdit} onDelete={handleDelete} />
      </View>
      
      {/* Comments */}
      <ScrollView>
        {post.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </ScrollView>
    </View>
  );
}
