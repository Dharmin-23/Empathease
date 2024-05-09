import React from 'react';
import { View } from 'react-native';
import CommentCard from '../../components/CommunityPost/CommentCard';
import CommentReplyCard from '../../components/CommunityPost/CommentReplyCard';
import dummyComments from './dummyComments.json';

const CommentSection = ({ commetDTOlist }) => {

  console.log(commetDTOlist)
  return (
    <View>
      {commetDTOlist.map((comment, index) => {
        const { id, content, userId, parentCommentID, postTime, postId } = comment;
        const parentComment = parentCommentID !== null ? dummyComments.find(comment => comment.id === parentCommentID) : null;
        
        if (parentComment) {
          const { username: parentUsername, content: parentContent } = parentComment;
          return (
            <CommentReplyCard
              key={id}
              username={userId} // Assuming username is the same as userId
              content={content}
              parentUsername={parentUsername}
              parentContent={parentContent}
              postTime={postTime}
              postId={postId} // Pass postId to the CommentReplyCard
            />
          );
        } else {
          return (
            <CommentCard
              key={id}
              username={userId} // Assuming username is the same as userId
              content={content}
              postTime={postTime}
              postId={postId} // Pass postId to the CommentCard
            />
          );
        }
      })}
      {dummyComments.map((comment, index) => {
        const { id, content, username, parentCommentID, postTime, postId } = comment;
        const parentComment = parentCommentID !== null ? dummyComments.find(comment => comment.id === parentCommentID) : null;
        
        if (parentComment) {
          const { username: parentUsername, content: parentContent } = parentComment;
          return (
            <CommentReplyCard
              key={id}
              username={username} // Assuming username is the same as userId
              content={content}
              parentUsername={parentUsername}
              parentContent={parentContent}
              postTime={postTime}
              postId={postId} // Pass postId to the CommentReplyCard
            />
          );
        } else {
          return (
            <CommentCard
              key={id}
              username={username} // Assuming username is the same as userId
              content={content}
              postTime={postTime}
              postId={postId} // Pass postId to the CommentCard
            />
          );
        }
      })}
    </View>
  );
};

export default CommentSection;
