import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar, useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { UserType, UserContext } from './UserContext';

// Importing screens
import SignIn from './screens/SignIn';
import Register from './screens/Register';
// import Homepage from './screens/Homepage';
import AnimTab from './bottomTab/AnimTab';
// import UserProfile from './screens/UserProfile';


import Colors from './constants/Colors';

import { Provider, MD2DarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import FriendsScreen from './screens/chat/FriendsScreen';
import ChatsScreen from './screens/chat/ChatListScreen';
import ChatMessagesScreen from './screens/chat/ChatWindow';
import DoctorDetailsScreen from './screens/Expert/DoctorDetailsScreen';
import CreatePost from './screens/Community/CreatePost';
import MakeAppointment from './screens/Expert/MakeAppointment';
import AllUsersScreen from './screens/Community/AllUsersScreen';
import CommunityPage from './screens/Community/CommunityPage';
import PostDetail from './screens/Community/PostDetail';
import CreateComment from './screens/Community/CreateComment';
import Question from './screens/Question';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    };
  
    return (
      <Provider theme={isDarkMode ? MD2DarkTheme : PaperDefaultTheme}>
        <UserContext>
        <NativeBaseProvider>

          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.white} />
          
            <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
              
              <RootStack />
              
            </NavigationContainer>
          
        </NativeBaseProvider>
        </UserContext>
      </Provider>
    );
};

// const options = {
//   gestureEnabled: true,
//   gestureDirection: 'horizontal',
//   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//   headerShown: false,
// };

const Stack = createSharedElementStackNavigator();

const RootStack = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="Homepage" component={Homepage} /> */}
        <Stack.Screen name="AnimTab" component={AnimTab} />
        <Stack.Screen name="ChatListScreen" component={ChatsScreen} />
        <Stack.Screen name="ChatWindow" component={ChatMessagesScreen} />
        <Stack.Screen name="FriendsScreen" component={FriendsScreen}/>
        <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />
        <Stack.Screen name="CreatePost" component={CreatePost}/>
        <Stack.Screen name="PostDetail" component={PostDetail}/>
        <Stack.Screen name="CommunityPage" component={CommunityPage}/>
        <Stack.Screen name="CreateComment" component={CreateComment}/>
        <Stack.Screen name="AllUsersScreen" component={AllUsersScreen}/>
        <Stack.Screen name="MakeAppointment" component={MakeAppointment}/>
        <Stack.Screen name="Question" component={Question}/>
        {/* <Stack.Screen name="UserProfile" component={UserProfile} /> */}
      </Stack.Navigator>
    );
};

export default App;
