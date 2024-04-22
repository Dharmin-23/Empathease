import { StyleSheet, Text, View, Pressable, Image, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import UserType from "../UserContext";
import { baseUrl } from "../constants/Constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [requestSentIds, setRequestSentIds] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/auth/", {
          headers: { Authorization: "Bearer " + token }
        });
        const userData = response.data.payload;
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error if needed
      }
    };

    fetchAllUsers();
  }, []);

  const sendFriendRequest = async (selectedUserId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await axios.post(baseUrl + "/api/helper/new", { id2: selectedUserId }, {
        headers: { Authorization: "Bearer " + token }
      });
      console.log("Sent request to: "+selectedUserId)
      console.log(response.data);
      // Add the user id to the list of request sent
      setRequestSentIds([...requestSentIds, selectedUserId]);
      // Handle success or error response
    } catch (error) {
      console.log("Error sending friend request:", error);
      // Handle error
    }
  };

  return (
    <ScrollView>
      {users.map((user) => (
        <Pressable
          key={user.id}
          style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
        >
          <View>
            {/* Render user image if available */}
            {/* <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                resizeMode: "cover",
              }}
              source={{ uri: user.image }}
            /> */}
          </View>

          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
            <Text style={{ marginTop: 4, color: "gray" }}>{user.email}</Text>
          </View>     
          {/* Check if the friend request is sent */}
          {requestSentIds.includes(user.id) ? (
            <Pressable
              style={{
                backgroundColor: "gray",
                padding: 10,
                width: 105,
                borderRadius: 6,
              }}
            >
              <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
                Request Sent
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => sendFriendRequest(user.id)}
              style={{
                backgroundColor: "indigo",
                padding: 10,
                borderRadius: 6,
                width: 105,
              }}
            >
              <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
                Add Friend
              </Text>
            </Pressable>
          )}
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default AllUsers;

const styles = StyleSheet.create({});
