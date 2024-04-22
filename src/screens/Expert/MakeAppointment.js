import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, IconButton } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const MakeAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [time, setTime] = useState(new Date());
  const [problem, setProblem] = useState('');

  const handleSendRequest = () => {
    // Logic to send appointment request
    console.log('Send appointment request:', { date, time, problem });
  };

  return (
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
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
  },
  problemInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
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
});

export default MakeAppointment;
