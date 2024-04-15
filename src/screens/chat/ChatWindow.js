import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatWindow = ({ route }) => {
  const { chatId, chatName } = route.params;

  // Dummy chat messages
  const messages = [
    { id: 1, text: 'Hello!', sender: 'John' },
    { id: 2, text: 'Hi there!', sender: 'Jane' },
    // Add more dummy messages as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {chatName}</Text>
      {messages.map(message => (
        <View key={message.id} style={styles.message}>
          <Text>{message.sender}: {message.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ChatWindow;
