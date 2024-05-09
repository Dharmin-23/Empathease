import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const UserChat = ({ id2, username }) => {
  const navigation = useNavigation();
  const localImage = require("../assets/images/avatar1.png");

  const [recepientId, setRecipientId] = useState([id2])
  const [recepientName, setRecipientName] = useState([username])

  // Hardcoded last message and timestamp
  const lastMessage = "Hi there! How are you?";
  const lastMessageTime = "10:30 AM";

  return (
    <>
      <Pressable
        onPress={() =>
          navigation.navigate("ChatWindow", {recepientId, recepientName})
        }
        style={[styles.container, styles.lightBlueBackground]}
      >
        <Avatar.Image size={50} source={localImage} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
        <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
      </Pressable>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  lightBlueBackground: {
    backgroundColor: "#E0F2F1", // Light blue background color
  },
  username: {
    fontSize: 15,
    fontWeight: "500",
    color:'black'
  },
  lastMessage: {
    color: "#424242", // Dark gray text color for last message
  },
  lastMessageTime: {
    marginLeft: 10,
    color: "#757575", // Medium gray text color for timestamp
  },
});

export default UserChat;
