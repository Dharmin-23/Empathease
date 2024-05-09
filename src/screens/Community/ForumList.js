import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Heading, Divider, Center, NativeBaseProvider, Pressable, Image, VStack, HStack } from 'native-base';
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
        console.log("Inside set categories"+ response.data.payload)
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
    <NativeBaseProvider>
      <ImageBackground
        source={require('../../assets/images/community.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Center>
            <Heading size="xl" fontWeight="bold" color="black" mb={4}>
              Welcome to Community!
            </Heading>
            <Divider bg="gray.200" w="80%" h={1} mb={4} />
          </Center>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              onPress={() => handleForumDetail(category)}
              style={styles.card}
            >
              <Card style={styles.item}>
                <VStack space={2} alignItems="center">
                  <Text style={styles.title}>{category.name}</Text>
                  <HStack alignItems="center">
                    <Text style={styles.actionText}>View Forum</Text>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </HStack>
                </VStack>
              </Card>
            </Pressable>
          ))}
        </View>
      </ImageBackground>
    </NativeBaseProvider>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden', // Ensure content within the card doesn't overflow
  },
  item: {
    backgroundColor: '#00008b',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  actionText: {
    color: 'white',
    marginRight: 5,
  },
});

export default ForumList;
