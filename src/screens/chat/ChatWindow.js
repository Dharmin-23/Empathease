

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import EmojiSelector from "react-native-emoji-selector";
// import { UserType } from "../UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatMessagesScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [recepientData, setRecepientData] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const { recepientId } = route.params;
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Simulate fetching messages
    const fetchMessages = async () => {
      try {
        // Simulate messages using JSON data
        const messagesData = require("../../components/dummyMessages.json");
        setMessages(messagesData);
        scrollToBottom();
      } catch (error) {
        console.log("error fetching messages", error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    // Simulate fetching recipient data
    const fetchRecepientData = async () => {
      try {
        // Simulate recipient data using JSON data
        const recepientData = require("../../components/dummyRecipient.json");
        setRecepientData(recepientData);
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchRecepientData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleSend = async () => {
    // Simulated sending of message
    try {
      // Simulate updating messages state
      const newMessage = {
        _id: messages.length + 1,
        message: message,
        senderId: 1, // Simulated sender ID
        recepientId: recepientId,
        timeStamp: new Date().toISOString(),
      };

      setMessages([...messages, newMessage]);
      scrollToBottom();
      setMessage(""); // Clear message input
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={scrollToBottom}
      >
        {messages.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              {
                alignSelf: item.senderId === 1 ? "flex-end" : "flex-start",
                backgroundColor: item.senderId === 1 ? "#007bff" : "#8a2be2",
                marginLeft: item.senderId !== 1 ? 10 : 0,
                marginRight: item.senderId === 1 ? 10 : 0,
              },
            ]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          value={message}
          onChangeText={setMessage}
          style={[styles.input, { color: "white" }]}
          placeholder="Type your message..."
        />

        <Pressable onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) =>
            setMessage((prevMessage) => prevMessage + emoji)
          }
          style={styles.emojiSelector}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;

const styles = StyleSheet.create({
  messageContainer: {
    padding: 8,
    marginVertical: 5,
    borderRadius: 7,
    maxWidth: "60%",
  },
  messageText: {
    fontSize: 13,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  emojiSelector: {
    height: 250,
  },
});
