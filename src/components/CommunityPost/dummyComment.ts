import { Comment } from "./CommentItem";

const dummyComments: Comment[] = [
  {
    id: "1",
    creatorId: "user1",
    creatorDisplayText: "User 1",
    creatorPhotoURL: "https://example.com/user1.jpg",
    communityId: "community1",
    postId: "post1",
    postTitle: "Post 1",
    text: "This is the first comment.",
  },
  {
    id: "2",
    creatorId: "user2",
    creatorDisplayText: "User 2",
    creatorPhotoURL: "https://example.com/user2.jpg",
    communityId: "community1",
    postId: "post1",
    postTitle: "Post 1",
    text: "This is the second comment.",
  },
  // Add more dummy comments as needed
];

export default dummyComments;