
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
// import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../../components/UserChat";

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
//   const { userId } = useContext(UserType);
  const userId = 1;
    const navigation = useNavigation();

  useEffect(() => {
    const fetchAcceptedFriends = async () => {
      try {
        // Simulated fetching of accepted friends from JSON file
        const acceptedFriendsData = require("./dummyAcceptedFriends.json");
        setAcceptedFriends(acceptedFriendsData);
      } catch (error) {
        console.log("Error fetching accepted friends:", error);
      }
    };

    fetchAcceptedFriends();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {acceptedFriends.map((item, index) => (
        <Pressable key={index} onPress={() => navigation.navigate("ChatWindow", { recepientId: item._id })}>
          <UserChat item={item} />
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
});
