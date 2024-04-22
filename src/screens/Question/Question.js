import React, { useState } from 'react';
import { View, Text, Pressable } from 'native-base';

const Question = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  // Function to handle option selection
  const handleOptionSelect = (questionId, optionValue) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: optionValue,
    }));
  };

  // Function to submit answers to backend
  const handleSubmit = () => {
    if (Object.values(selectedOptions).some(option => option === undefined)) {
      // If any option is not selected, return without submitting
      return;
    }

    // Calculate the sum of selected options
    const sum = Object.values(selectedOptions).reduce((acc, curr) => acc + parseInt(curr), 0);
    console.log('Sum of selected options:', sum);

    // You can send the sum to the backend using an API call here

    // Reset selectedOptions
    setSelectedOptions({});
  };

  // Dummy questionnaire data
  const questionnaireData = [
    { id: 1, question: 'How often have you been bothered by feeling nervous, anxious, or on edge?', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    // Add more questions as needed
  ];

  // Function to check if all questions are answered
  const areAllQuestionsAnswered = () => {
    return Object.values(selectedOptions).every(option => option !== undefined);
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      {questionnaireData.map(question => (
        <View key={question.id} style={{ backgroundColor: 'white', padding: 10, marginVertical: 10, borderRadius: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{question.question}</Text>
          <View style={{ borderBottomWidth: 1, borderColor: 'rgba(0, 0, 0, 0.1)', marginHorizontal: -10, marginBottom: 10 }} />
          {question.options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => handleOptionSelect(question.id, index)}
              style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: selectedOptions[question.id] === index ? 'blue' : 'gray',
                  backgroundColor: selectedOptions[question.id] === index ? 'blue' : 'white',
                  marginRight: 10,
                }}
              />
              <Text>{option}</Text>
            </Pressable>
          ))}
        </View>
      ))}
      <Pressable
        onPress={handleSubmit}
        disabled={!areAllQuestionsAnswered()}
        style={{
          backgroundColor: areAllQuestionsAnswered() ? 'blue' : 'gray',
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {areAllQuestionsAnswered() ? 'Submit Answers' : 'Answer All Questions'}
        </Text>
      </Pressable>
    </View>
  );
};

export default Question;
