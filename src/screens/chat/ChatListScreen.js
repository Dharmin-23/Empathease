import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChatListScreen = ({ navigation }) => {
  // Dummy chat data
  const chats = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more dummy chat data as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat List</Text>
      {chats.map(chat => (
        <TouchableOpacity
          key={chat.id}
          style={styles.chatItem}
          onPress={() => navigation.navigate('ChatWindow', { chatId: chat.id, chatName: chat.name })}
        >
          <Text>{chat.name}</Text>
        </TouchableOpacity>
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
  chatItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default ChatListScreen;
