import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { List, Avatar } from "react-native-paper";
import axios from "axios";
// import { UserType } from "../UserContext";
import FriendRequest from "../../components/FriendRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../constants/Constants";

const FriendsScreen = ({route}) => {
//   const { userId, setUserId } = useContext(UserType);
  // const [friendRequests, setFriendRequests] = useState(route.params);
  const {friendRequests} = route.params;
  console.log("In friends screen ", friendRequests)
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Friend Requests</Text>
        <List.Section>
          {friendRequests.map((request) => {
            const { id2: userId, username } = request;
            return (
              <FriendRequest
                key={userId} // Use userId as the key
                userId={userId}
                username={username}
              />
            );
          })}
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
