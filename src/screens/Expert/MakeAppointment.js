import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ImageBackground, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { IconButton } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MakeAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(new Date());
  const [problem, setProblem] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleSendRequest = async () => {
    // Logic to send appointment request
    try{
      const username = await AsyncStorage.getItem("username");
      const token = await AsyncStorage.getItem("authToken");
  
      const isoDate = date.toISOString(); // Date in ISO format
      const isoTime = time.toISOString(); // Time in ISO format
      const requestData = {
        doctor: "Doctor",
        patient: username,
        appointmentAt: isoDate, // Combine date and time
      };
  
      
      const response = await axios.post(baseUrl + "/appointment/create", requestData, {
        headers: { Authorization: "Bearer " + token }
      });
  
      console.log('Sent appointment request:!! ', isoDate + 'T' + isoTime);
      setModalVisible(true);
    }
    catch (error) {
      console.error('Error creating appnt:', error);
    }
    
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('AnimTab'); // Redirect to Homepage
  };

  return (
    <ImageBackground source={require('../../assets/images/appointment_wallpaper.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Make Appointment</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date:</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.input}
              value={date ? date.toLocaleDateString() : ''}
              placeholder="Choose date"
              editable={false}
            />
            <IconButton
              icon={<MaterialIcons name="calendar-today" size={24} color="white" />}
              onPress={() => setOpenDate(true)}
            />
          </View>

          <DatePicker
            modal
            open={openDate}
            date={date}
            mode='date'
            onConfirm={(selectedDate) => {
              setOpenDate(false);
              setDate(selectedDate);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Time:</Text>
          <View style={styles.dateInputContainer}>
            <TextInput
              style={styles.input}
              value={time ? time.toLocaleTimeString() : ''}
              placeholder="Choose Time"
              editable={false}
            />
            <IconButton
              icon={<MaterialIcons name="access-time" size={24} color="white" />}
              onPress={() => setOpenTime(true)}
            />
          </View>

          <DatePicker
            modal
            open={openTime}
            date={time}
            mode='time'
            onConfirm={(selectedTime) => {
              setOpenTime(false);
              setTime(selectedTime);
            }}
            onCancel={() => {
              setOpenTime(false);
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Problem Faced:</Text>
          <TextInput
            style={styles.problemInput}
            value={problem}
            onChangeText={setProblem}
            placeholder="Describe the problem"
            multiline
            numberOfLines={4}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleSendRequest}>
          <Text style={styles.buttonText}>Send Request</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={require('../../assets/images/correct.png')} style={styles.modalImage} />
              <Text style={styles.modalText}>
                Your appointment with <Text style={styles.doctorName}>Doctor</Text> has been fixed!
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: 'white',
  },
  problemInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    color: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  doctorName: {
    color: 'blue', // Set color to blue
    fontWeight: 'bold', // Optionally set font weight
  },
});

export default MakeAppointment;
