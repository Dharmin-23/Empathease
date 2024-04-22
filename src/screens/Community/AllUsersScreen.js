import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../../UserContext";

// import axios from "axios";
import AllUsers from "../../components/AllUsers";
const AllUsersScreen = ({route}) => {

  const {users} = route.params;
  console.log("users", users);
  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <AllUsers key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default AllUsersScreen;

const styles = StyleSheet.create({});