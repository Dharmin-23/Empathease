import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../constants/Constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FriendRequest = ({ userId, username }) => {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  

  const acceptRequest = async () => {
    try {
      const requestBody = { id2: userId }
      const token = await AsyncStorage.getItem("authToken");
      await axios.post(baseUrl + "/api/helper/accept", requestBody, {
        headers: { Authorization: "Bearer " + token }
      });
      console.log("Accepted Succesfully!!!");
      setAccepted(true); // Update the state to indicate acceptance
      // You can navigate to the chats screen here or perform any other action
      navigation.navigate("AnimTab");
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <Pressable style={styles.container} onPress={acceptRequest} disabled={accepted}>
      <View style={styles.content}>
        <Text style={styles.name}>
          <Text style={styles.bold}>{username}</Text> sent you a friend request!
        </Text>
      </View>
      <Pressable style={[styles.acceptButton, accepted && styles.acceptedButton]} onPress={acceptRequest} disabled={accepted}>
        <Text style={styles.acceptButtonText}>{accepted ? 'Accepted' : 'Accept'}</Text>
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
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: "#0066b2",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  acceptedButton: {
    backgroundColor: "gray", // Change button color to gray when accepted
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
