import React from 'react'
import { StyleSheet, TouchableOpacity, Text, FlatList, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../constants/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import fetchCategories from '../constants/Categories'


const CategoryPicker = ({ selectedCategory,forumName, setForumName, onClick, addAll, setFieldValue, ...props }) => {

  const { colors } = useTheme();
  const [categories, setCategories] = useState([]);
  

  const handleCategoryPress = (category) => {
    console.log('inside handlecateogryporess'+category)
    setForumName(category);
    console.log('inside handlecateogryporess : '+ forumName)
    setFieldValue('category', category)
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log(token)
        const response = await axios.get(baseUrl + "/forum/", {
          headers: { Authorization: "Bearer " + token }
        });
        console.log(response.data.payload)
        setCategories(response.data.payload);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error if needed
      }
    };
  
    fetchData();
  }, []);

  return (
    <View {...props}>
      <FlatList
        data={addAll ? ['all', ...categories.map(item => item.name)] : categories.map(item => item.name)}
        horizontal
        keyExtractor={(item, index) => item + index.toString()} // Use index as key for flatlist
        renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
    >
      <Text
        style={[
          styles.category,
          {
            fontWeight: item === selectedCategory ? 'bold' : 'normal',
            borderBottomColor: item === selectedCategory ? colors.blue : 'transparent',
            color: item === selectedCategory ? colors.blue : colors.text
          }
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  )}
/>
    </View>
  )
}

const styles = StyleSheet.create({
  category: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    borderBottomWidth: 1,
    fontFamily: 'OpenSans-SemiBold'
  }
})

export default CategoryPicker
