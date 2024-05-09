import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef, useState, useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useColorScheme, ActivityIndicator } from 'react-native'
import Icon, { Icons } from '../components/Icons';
import Colors from '../constants/Colors';
import ColorScreen from '../screens/ColorScreen';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Homepage from '../screens/Homepage';
import Question from '../screens/Question';
import Community from '../screens/Community';
import Expert from '../screens/Expert';
import Resources from '../screens/Resources';
import UserProfile from '../screens/UserProfile';
import ForumList from '../screens/Community/ForumList';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';
import { IconButton, MD3Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../UserContext';
import  jwt_decode  from 'jwt-decode';
import axios from 'axios';

import { baseUrl } from '../constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Bank from '../screens/Question/Bank';


const TabArr = [
  { route: 'Homepage', label: 'Home', type: Icons.AntDesign, icon: 'home', component: Homepage },
  { route: 'Bank', label: 'Test', type: Icons.AntDesign, icon: 'question', component: Bank },
  { route: 'Community', label: 'Community', type: Icons.AntDesign, icon: 'team', component: ForumList },
  { route: 'Expert', label: 'Expert', type: Icons.Entypo, icon: 'graduation-cap', component: Expert },
  { route: 'Resources', label: 'Resources', type: Icons.AntDesign, icon: 'videocamera', component: Resources },
];

const Tab = createBottomTabNavigator();



const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }



const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const { colors } = useTheme()
  const color = isDarkMode ? Colors.white : Colors.black;
  const bgColor = colors.background;

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={[styles.btn, { borderColor: bgColor, backgroundColor: bgColor }]}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.primary} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[styles.text, { color }]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const AnimTab = () => {
  // console.log(UserType)
  // const { user, setUser } = useContext(UserType);
  const [isLoading, setIsLoading] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptedFriends, setAcceptedFriends]= useState([]);
  
  const [users, setUsers] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  //const { email } = route.params;
  const navigation = useNavigation();

  const handleTabPress = (item, navigation) => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate(item.route);
      setIsLoading(false);
    }, 500); // Set timeout for 1.5 seconds
  };

  const fetchUsers = async () => {
    console.log('Fetch Users from AnimTab')
    
    axios
      .get(baseUrl + "/auth/")
      .then((response) => {
        // console.log(JSON.stringify(response,null, 2))
        // console.log('@'+response.data.payload)
        setUsers(response.data.payload);
      })
      .catch((error) => {
        console.log("error retrieving users", error);
      });
  };


  const fetchFriendRequestsUserInfo = async (ids) => {
    try {
      // console.log("inside fetchfriendrequsetinfo")
      const token = await AsyncStorage.getItem("authToken");
      const requests = ids.map(async (id) => {
        const data= {"id":id};
        const res = await axios.post(baseUrl + "/auth/specific",data, {
          headers: { Authorization: "Bearer " + token }
        });
        const d = res.data.payload; 
        return { id2: id, username: d }; // Assuming the user info is stored in 'payload'
      });
      const userData = await Promise.all(requests);
      return userData;
    } catch (error) {
      console.error("Error fetching user info:", error);
      return [];
    }
  };

  const fetchFriendRequests = async () => {
    try {
        // Simulated fetch using the dummyFriends.json file
     
        const token = await AsyncStorage.getItem("authToken");
        const res = await axios.get(baseUrl + "/api/helper/toAccept", {
          headers: { Authorization: "Bearer " + token }
        });
        
        axios.get(baseUrl+"api/helper/")
        
        const stringfyiedjson =JSON.parse(JSON.stringify(res))
    
        const friendRequestIds = stringfyiedjson.data.payload;
        
        const userData = await fetchFriendRequestsUserInfo(friendRequestIds);
        
        if (Array.isArray(userData)) {
          
          setFriendRequests(userData);
        }
        
      } catch (err) {
        console.log("error message", err);
      }

  };

  const fetchAcceptedFriends = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      // const userId = await AsyncStorage.getItem("userId");
      const res = await axios.get(baseUrl + "/api/helper/accepted", {
          headers: { Authorization: "Bearer " + token }
        });
      const stringfyiedjson =JSON.parse(JSON.stringify(res, null, 2))
      const accpetedIds = stringfyiedjson.data.payload;
        
      const friendsData = await fetchFriendRequestsUserInfo(accpetedIds);
      // console.log("Accepted Friends Data", friendsData)
      if (Array.isArray(friendsData)) {
          
        setAcceptedFriends(friendsData);
      }
      console.log("Accepted Friends", acceptedFriends)
      // Simulated fetching of accepted friends from JSON file
      // const acceptedFriendsData = require("./dummyAcceptedFriends.json");
    } catch (error) {
      console.log("Error fetching accepted friends:", error);
    }
  };



  useEffect(() => {
    fetchUsers();
    // console.log("Calling Fetch friend requests in AnimTab")
    fetchFriendRequests();
    fetchAcceptedFriends();
  }, []);


  const handleChatIconPress = () => {
    navigation.navigate('ChatListScreen', {acceptedFriends});
  };

  const handleAllUsers = () => {
    console.log("Passing users to AllUsersScreen")
    // console.log(users);
    navigation.navigate('AllUsersScreen', { users: users });
  }
  
  return (
    
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => setShowProfileModal(true)} style={styles.profileContainer}>
          <Avatar.Image size={60} source={require('../assets/images/avatar.png')} />
          <Text style={styles.username}>Your Profile</Text>
        </TouchableOpacity>

        <IconButton
          icon="chat"
          mode="contained-tonal"
          rippleColor={MD3Colors.secondary50}
          iconColor={MD3Colors.secondary80}
          size={30}
          onPress={handleChatIconPress}
          
          
        />

        <IconButton
          icon="account-multiple-plus"
          mode="contained"
          iconColor={MD3Colors.secondary80}
          size={30}
          onPress={() => navigation.navigate("FriendsScreen", {friendRequests})}
          style={{marginRight: 30}}
        />

        <View>
        
          <TouchableOpacity onPress={handleAllUsers}>
            <IconButton
              icon="account-group"
              mode="contained"
              iconColor={MD3Colors.secondary80}
              size={30}
              onPress={handleAllUsers}

              
              
            />
              <Text style={styles.alluser} >Discover</Text>
          </TouchableOpacity>
      
        </View>
        
        

        

        
      </LinearGradient>

      <UserProfile 
        isVisible={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => (
                  // <TabButton
                  //   {...props}
                  //   item={item}
                  //   onPress={() => navigation.navigate(item.route)}
                  // />
                  <TabButton
                  {...props}
                  item={item}
                  onPress={() => handleTabPress(item, navigation)}
                />
                )
              }}
            />
          )
        })}
      </Tab.Navigator>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto', // Align the profile container to the right
  },
  username: {
    marginTop: 8,
    color: 'white',
  },
  
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    margin: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.primary,
    fontWeight: '500'
  },
  alluser: {
    marginRight:10,
  }
})

export default AnimTab;
