import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DoctorCard from "../../components/DoctorCard";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Modal } from "react-native";
import { useEffect } from "react";
import { baseUrl } from "../../constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Feather from 'react-native-vector-icons/Feather';


const Expert = () => {
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
   // State for the search input
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axios.get(baseUrl + "/appointment/get" , {
          headers: { Authorization: "Bearer " + token }
        });
        setUpcomingAppointments(response.data.payload);
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchAppointments();
  }, []);

  const doctorsData = [
    {
      id: "1",
      name: "Dr. Dharmin Mehta",
      categories: ["Depression", "Psychology"],
      location: "Bengaluru",
      experience: "10 years",
      education: "MD, Psychology",
      languages: ["English", "Spanish"],
      bio: "Dr. Dharmin Mehta is an experienced therapist with a passion for helping patients improve their mental health. He has a strong educational background and is fluent in multiple languages.",
      rating: 4.9,
      reviews: 0,
      photo:
        "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      name: "Dr. Doctor2",
      categories: ["Addction"],
      location: "Mumbai",
      experience: "8 years",
      education: "MD",
      languages: ["English", "Hindi"],
      bio: "Dr. Doctor2 specializes in dermatology and allergology. She is known for her compassionate care and expertise in treating skin conditions and allergies.",
      rating: 4.8,
      reviews: 0,
      photo:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const formatAppointmentTime = (isoTime) => {
    const date = new Date(isoTime);
    // Format the date and time as per your preference
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  };

  // Generate categories from the unique categories found in doctorsData
  const categories = Array.from(
    new Set(doctorsData.flatMap((doctor) => doctor.categories))
  );

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Search Input with Search Icon */}
        

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.title}>All Doctors</Text>
          {/* Notification Button */}
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.notificationIcon}>
            <Feather name="bell" size={24} color="#333" />
            <Text style={styles.notificationCount}>1</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.doctorList}
          showsVerticalScrollIndicator={false}
        >
          {doctorsData.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Upcoming Appointments</Text>
              {upcomingAppointments.map((appointment, index) => (
                <Text key={index} style={styles.appointmentText}>
                  Upcoming appointment with <Text style={styles.doctorName}>{appointment.doctor}</Text> at {formatAppointmentTime(appointment.appointmentAt)}                
                </Text>
              ))}
            </View>
          </View>
        </Modal>

        

      </View>
    // </SafeAreaView>
  );
};

export default Expert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginLeft: 10,
    
  },
  doctorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  notificationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationCount: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 10,
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:'black',
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
    color:'#7a7a78',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 5,
  },
  searchInput: {
    flex: 1,
  },
  categoryMenu: {
    marginTop: 10,
    height: 60, // Increase the height of the category menu
  },
  categoryButton: {
    backgroundColor: "#00b894",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    height: 40, // Increase the height of the category buttons
  },
  categoryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  doctorName: {
    fontWeight:'bold',
    color: '#5e81ff', // Adjust the color as needed
  },
});