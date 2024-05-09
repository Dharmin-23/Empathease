import React, { useState , useEffect} from 'react';
import { View, Text, Pressable } from 'native-base';
import { baseUrl } from '../../constants/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { Radio } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Question = ({route}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const {bankId} = route.params;
  const [questions, setQuestions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/api/question?bankId="+bankId , {
          headers: { Authorization: "Bearer " + token }
        });
        setQuestions(response.data.payload);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    
    fetchData();
  }, [bankId]); // Add bankId to dependency array

  // Function to handle option selection
  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: optionId,
    }));
  };

  // Function to submit answers to backend
  const handleSubmit = async () => {

    try {
      // Your form submission logic here
      const answers = Object.entries(selectedOptions).map(([questionId, optionId]) => ({
        questionId: parseInt(questionId),
        optionId: parseInt(optionId),
      }));
  
      const response = {
        bankId: bankId,
        answers: answers,
      };
      
      const token = await AsyncStorage.getItem("authToken");
      
      
      // Example axios post request:
      await axios.post(baseUrl+'/api/bank/submit', response, {
        headers: { Authorization: "Bearer " + token }
      });

      navigation.navigate('AnimTab');
      // setMessage('Successfully Created!');
      // fadeIn();
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Failed to create post');
    }

    // console.log("Here are selected options:", selectedOptions);
    // console.log(JSON.stringify(response))


  };

  // Function to check if all questions are answered
  const areAllQuestionsAnswered = () => {
    return Object.keys(selectedOptions).length === questions.length;
  };

  return (
    <ScrollView style={{ marginHorizontal: 10 }}>
      {questions.map(question => (
        <View key={question.first.id} style={{ backgroundColor: 'white', padding: 10, marginVertical: 10, borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{question.first.content}</Text>
          <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', marginHorizontal: -10, marginBottom: 10 }} />
          <Radio.Group
            name={`question-${question.first.id}`}
            value={selectedOptions[question.first.id]}
            onChange={(value) => handleOptionSelect(question.first.id, value)}
          >
            {question.second.map((option) => (
              <Radio key={option.id} value={option.id} my={1}>
                <Text>{option.content}</Text>
              </Radio>
            ))}
          </Radio.Group>
        </View>
      ))}
      <Pressable
        onPress={handleSubmit}
        disabled={!areAllQuestionsAnswered()}
        style={{
          backgroundColor: areAllQuestionsAnswered() ? 'lightcyan' : 'gray',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'black', fontWeight: 'bold' }}>
          {areAllQuestionsAnswered() ? 'Submit Answers' : 'Answer All Questions'}
        </Text>
      </Pressable>
    </ScrollView> 
  );
};

export default Question;
