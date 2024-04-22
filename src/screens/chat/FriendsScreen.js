import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { List, Avatar } from "react-native-paper";
import axios from "axios";
// import { UserType } from "../UserContext";
import FriendRequest from "../../components/FriendRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../constants/Constants";

const FriendsScreen = () => {
//   const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequestsUserInfo = async (ids) => {
    try {
      console.log("inside fetchfriendrequsetinfo")
      const token = await AsyncStorage.getItem("authToken");
      const requests = ids.map(async (id) => {
        console.log("Request id: "+id)
        const data= {"id":id};
        console.log(data)
        const res = await axios.post(baseUrl + "/auth/specific",data, {
          headers: { Authorization: "Bearer " + token }
        });
        return res.data.payload; // Assuming the user info is stored in 'payload'
      });
      const userData = await Promise.all(requests);
      return userData;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return [];
    }
  };


  const fetchFriendRequests = async () => {
    // try {
    //   const response = await axios.get(
    //     `http://localhost:8000/friend-request/${userId}`
    //   );
    //   if (response.status === 200) {
    //     const friendRequestsData = response.data.map((friendRequest) => ({
    //       _id: friendRequest._id,
    //       name: friendRequest.name,
    //       email: friendRequest.email,
    //       image: friendRequest.image,
    //     }));

    //     setFriendRequests(friendRequestsData);
    //   }
    // } catch (err) {
    //   console.log("error message", err);
    // }
    try {
        // Simulated fetch using the dummyFriends.json file
        const response = require('./dummyFriends.json');
        const token = await AsyncStorage.getItem("authToken");
        const res = await axios.get(baseUrl + "/api/helper/toAccept", {
          headers: { Authorization: "Bearer " + token }
        });
        
        axios.get(baseUrl+"api/helper/")
        
        const stringfyiedjson =JSON.parse(JSON.stringify(res))
    
        const friendRequestIds = stringfyiedjson.data.payload;
        
        const userData = await fetchFriendRequestsUserInfo(friendRequestIds);
        if (Array.isArray(userData)) {
          console.log(userData)
          setFriendRequests(userData);
        }
      } catch (err) {
        console.log("error message", err);
      }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Friend Requests</Text>

      <List.Section>
        {friendRequests.map((item) => (
          <FriendRequest
            key={item._id}
            item={item}
            friendRequests={friendRequests}
            setFriendRequests={setFriendRequests}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
