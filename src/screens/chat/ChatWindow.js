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
  Platform,
  RefreshControl,
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EmojiSelector from "react-native-emoji-selector";
import { baseUrl } from "../../constants/Constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatMessagesScreen = ({route}) => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to track refresh action
  const navigation = useNavigation();
  const [myId, setMyId] = useState([]);
  const { recepientId, recepientName} = route.params;
  const hardcodedProfilePic = require("../../assets/images/avatar.png");
  
  

  const [message, setMessage] = useState("");
  const scrollViewRef = useRef(null);
  const fetchUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      
      setMyId(userId)// Update the state with the fetched username
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  }
  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      
      const response = await axios.post(
        baseUrl + "/api/chat",
        { id2: recepientId[0] },
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(" RecipientID: "+ recepientId+ "My Id: "+ myId)
      // console.log("meesaseges list: ", response.data.payload)
      setMessages(response.data.payload.reverse());
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };


  useEffect(() => {
    fetchUserId();
    
    fetchMessages();
  }, [myId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleSend = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(
        baseUrl + "/api/chat/new",
        { receiverId: recepientId[0] ,
          content: message},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      scrollToBottom();
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.log("error in sending the message", error);
    }
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const onRefresh = () => {
    setRefreshing(true); // Set refreshing to true when refresh starts
    // Fetch new data or refresh existing data here
    fetchMessages().then(() => {
      setRefreshing(false); // Set refreshing to false when data is refreshed
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={styles.infoBar}>
        <Image source={hardcodedProfilePic} style={styles.profilePic} />
        <Text style={styles.recepientName}>{recepientName}</Text>
        <FontAwesome
          name="ellipsis-v"
          size={24}
          color="#fff"
          style={{ marginRight: 10 }}
        />
      </View>
      <Image source={require("../../assets/images/chat-wallpaper.jpg")} style={styles.backgroundImage} />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={scrollToBottom}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#a1baff"]}
          />
        }
      >
        {messages.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              {
                alignSelf: String(item.receiverId) === String(myId) ? "flex-start" : "flex-end",
                backgroundColor: String(item.receiverId) === String(myId) ? "#c1cff5" : "#19056e",
                marginLeft: String(item.receiverId) === String(myId) ? 20 : 0,
                marginRight: String(item.receiverId) !== String(myId) ? 20 : 0,
              },
            ]}
          >
            <Text style={[styles.messageText, { color: String(item.receiverId) === String(myId) ? "#000" : "#fff" }]}>
              {item.content}
            </Text>
            <Text style={[styles.timeText, { color: String(item.receiverId) === String(myId) ? "#555557" : "#757575" }]}>{formatDate(item.timestamp)}</Text>
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
          style={[styles.input, { color: "#fff" }]}
          placeholder="Type your message..."
          placeholderTextColor="#757575"
        />

        <Entypo
          onPress={handleSend}
          name="paper-plane"
          size={24}
          color="#a1baff"
          style={styles.sendIcon}
        />
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
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#42464f",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 15,
    paddingLeft: 10,
  },
  recepientName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: -5,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
  },
  messageContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 7,
    maxWidth: "60%",
    position: 'relative',
  },
  messageText: {
    fontSize: 13,
  },
  timeText: {
    fontSize: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 0, // Add margin bottom for space
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
    backgroundColor: "#000",
  },
  input: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#000",
  },
  sendIcon: {
    marginLeft: 8,
  },
  emojiSelector: {
    height: 250,
  },
});

