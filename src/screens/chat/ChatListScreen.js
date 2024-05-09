import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../../components/UserChat";

const ChatsScreen = ({ route }) => {
  const { acceptedFriends } = route.params; // Accessing acceptedFriends from route params
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {acceptedFriends.map((friend, index) => {
        const { id2, username } = friend; // Destructuring friend object
        return (
          <Pressable key={index} onPress={() => navigation.navigate("ChatWindow", { id2: id2 })}>
            <UserChat 
              key={id2}
              id2={id2}
              username={username} 
            />
          </Pressable>
        );
      })}
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
