import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Box, Heading, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseUrl } from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ImageBackground } from 'react-native';

const ForumList = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/forum/", {
          headers: { Authorization: "Bearer " + token }
        });
        setCategories(response.data.payload);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error if needed
      }
    };

    getCategories();
  }, []);

  const handleForumDetail = (category) => {
    console.log("Inside handleForumDetail:", category);
    navigation.navigate('CommunityPage', { forumName: category.name });
  };

  return (
    
    <View style={styles.container}>
         
      <Box alignItems="center">
        <Heading size="xl" fontWeight="bold" color="black" mb={4}>
          Welcome to Community!
        </Heading>
        <Divider bg="gray.200" w="80%" h={1} mb={4} />
      </Box>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} onPress={() => handleForumDetail(category)}>
          <Box style={styles.item}>
            <Text style={styles.title}>{category.name}</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </Box>
        </TouchableOpacity>
      ))}
    </View>
    
  );
};

const styles = StyleSheet.create({
    backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
    },

    container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
    item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00008b',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
    title: {
    fontSize: 18,
    color: 'white', // Text color set to black
    fontWeight: 'bold',
  },
});

export default ForumList;
