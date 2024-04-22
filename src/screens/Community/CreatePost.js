import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryPicker from '../../components/CategoryPicker';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { baseUrl } from '../../constants/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePost = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [forumName, setForumName] = useState('')
  const [formData, setFormData] = useState({
    type: 'text',
    category: '',
    title: '',
    url: '',
    content: '',
  });
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setMessage(null);
    }, 6000);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    formData.category=forumName;
    setIsLoading(true);
    try {
      // Your form submission logic here
      
      const token = await AsyncStorage.getItem("authToken");
      
      const data = {"forumName" : formData.category , "title": formData.title, "content":formData.content}
      console.log('Form data:', data);
      // Example axios post request:
      await axios.post(baseUrl+'/forum/create-post', data, {
        headers: { Authorization: "Bearer " + token }
      });
      // setMessage('Successfully Created!');
      // fadeIn();
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Failed to create post');
    }
    setIsLoading(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bgColor }]}>
      {message && (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          {!!message && <Text style={styles.message}>{message}</Text>}
        </Animated.View>
      )}
      <View style={styles.flexRow}>
        <Text style={[styles.formLabel, { color: colors.text }]}>Type</Text>
      </View>
      <View style={styles.typeContainer}>
        <Button
          mode="contained"
          onPress={() => handleChange('type', 'text')}
          style={[
            styles.typeButton,
            styles.typeButtonLeft,
            { backgroundColor: formData.type === 'text' ? colors.blue : colors.background },
          ]}
        >
          Text
        </Button>
        <Button
          mode="contained"
          onPress={() => handleChange('type', 'link')}
          style={[
            styles.typeButton,
            styles.typeButtonRight,
            { backgroundColor: formData.type === 'link' ? colors.blue : colors.background },
          ]}
        >
          Link
        </Button>
      </View>
      <View style={styles.flexRow}>
        <Text style={[styles.formLabel, { color: colors.text }]}>Category</Text>
      </View>
      <CategoryPicker selectedCategory={formData.category} forumName= {forumName} setForumName={setForumName} setFieldValue={(value) => handleChange('category', value)} />

      <View style={styles.flexRow}>
        <Text style={[styles.formLabel, { color: colors.text }]}>Title</Text>
      </View>
      <TextInput
        style={[
          styles.textInput,
          { color: 'white', height: 40 },
        ]}
        value={formData.title}
        onChangeText={(value) => handleChange('title', value)}
      />
      {formData.type === 'link' ? (
        <>
          <View style={styles.flexRow}>
            <Text style={[styles.formLabel, { color: colors.text }]}>Url</Text>
          </View>
          <TextInput
            style={[
              styles.textInput,
              { borderColor: colors.border, color: colors.text },
            ]}
            multiline
            value={formData.url}
            onChangeText={(value) => handleChange('url', value)}
          />
        </>
      ) : (
        <>
          <View style={styles.flexRow}>
            <Text style={[styles.formLabel, { color: colors.text }]}>Text</Text>
          </View>
          <TextInput
            style={[
              styles.textInput,
              { borderColor: colors.border, color: colors.text },
            ]}
            multiline
            value={formData.text}
            onChangeText={(value) => handleChange('content', value)}
          />
        </>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.blue }]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Ionicons name="add" size={20} color="#FFFFFF" />
          )}
          <Text style={styles.submitButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  typeContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 0.48,
    borderRadius: 10,
  },
  typeButtonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  typeButtonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  formLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },
  flexRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  message: {
    color: '#5b715d',
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
  },
});

export default CreatePost;
