import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { UserType } from "../UserContext";
import dummyMessages from "./dummyMessages.json";
import dummyUsers from "./dummyUsers.json";

const UserChat = ({ userId, item }) => {
//   const { setUserId } = useContext(UserType);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // Simulate fetching messages
  useEffect(() => {
    // Delayed fetching to simulate asynchronous behavior
    setTimeout(() => {
      setMessages(dummyMessages);
    }, 1000);
  }, []);

  const getLastMessage = () => {
    const userMessages = messages.filter(
      (message) => message.senderId === userId && message.recipientId === item._id
    );

    const n = userMessages.length;

    return n > 0 ? userMessages[n - 1] : null;
  };

  const lastMessage = getLastMessage();

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  const user = dummyUsers.find((user) => user.id === item._id);

  if (!user) return null;

  return (
    <>
      <Pressable
        onPress={() =>
          navigation.navigate("ChatWindow", {
            recipientId: item._id,
          })
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Avatar.Image size={50} source={{ uri: user.image }} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>{user.name}</Text>
          {lastMessage && (
            <Text style={{ marginTop: 3, color: "white", fontWeight: "500" }}>
              {lastMessage?.message}
            </Text>
          )}
        </View>
        <View>
          <Text style={{ fontSize: 11, color: "#585858" }}>
            {lastMessage && formatTime(lastMessage?.timeStamp)}
          </Text>
        </View>
      </Pressable>
      <Divider />
    </>
  );
};

export default UserChat;
