import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
// import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "native-base";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  // const { userId } = useContext(UserType);
  const userId =1;
  const navigation = useNavigation();
  console.log(item)

  const acceptRequest = () => {
    // Simulated acceptance of friend request
    try {
      // Remove the friend request from the list
      setFriendRequests(
        friendRequests.filter((request) => request._id !== item._id)
      );
      // Navigate to the chats screen
      navigation.navigate("Chats");
    } catch (error) {
      console.log("Error accepting friend request:", error);
    }
  };

  return (
    <Pressable style={styles.container} onPress={acceptRequest}>
      <Avatar source={{ uri: item.image }} size="sm" />
      <Text style={styles.name}>
        <Text style={styles.bold}>{item}</Text> sent you a friend request!
      </Text>
      <Pressable style={styles.acceptButton} onPress={acceptRequest}>
        <Text style={styles.acceptButtonText}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10, // Increased padding
    backgroundColor: "#F5F5F5",
    borderRadius: 10, // Increased border radius
  },
  avatar: {
    borderRadius: 30, // Increased border radius
  },
  name: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333", // Adjusted text color
    marginRight: 10,
  },
  bold: {
    fontWeight: "bold", // Displaying friend's name in bold
  },
  acceptButton: {
    backgroundColor: "#0066b2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});