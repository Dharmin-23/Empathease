import React, { useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { baseUrl } from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const categories = [
  { id: 1, name: 'Depression' },
  { id: 2, name: 'Anxiety' },
  { id: 3, name: 'Stress' },
  { id: 4, name: 'PTSD' },
  { id: 5, name: 'Bipolar Disorder' },
  // Add more categories as needed
];







const Bank = ({ navigation }) => {
  const navigateToCategory = (bankId) => {
    // console.log("Passing bank Id: " +bankId)
    // Navigate to the category page passing the category ID as a parameter
    navigation.navigate('Question', { bankId });
  };

  const [Banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/api/bank", {
          headers: { Authorization: "Bearer " + token }
        });
        
        const stringfyiedjson =JSON.parse(JSON.stringify(response))
    
        const bankDetails = stringfyiedjson.data.payload;
        // console.log(bankDetails)
        
        
        setBanks(bankDetails);

        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchData();
  }, []);



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        {/* Add your GIF here */}
        <Image source={require('../../assets/images/brain.gif')} style={styles.gif} />
        <Text style={styles.headerText}>Welcome to Assesments!</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.cardContainer}>
        {Banks.map(bank => (
          <Card key={bank.id} style={styles.card}>
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => navigateToCategory(bank.id)}
            >
              <Text style={styles.categoryName}>{bank.description}</Text>
              <IconButton icon="chevron-right" />
            </TouchableOpacity>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // off-white background color
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    
  },
  gif: {
    width: 200,
    height: 200,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
  line: {
    borderBottomColor: 'rgba(0, 0, 0, 0.3)', // faint line color
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#ADD8E6', // light blue color
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  categoryName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Bank;
