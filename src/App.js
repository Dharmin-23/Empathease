import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar, useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

// Importing screens
import SignIn from './screens/SignIn';
import Register from './screens/Register';
// import Homepage from './screens/Homepage';
import AnimTab from './bottomTab/AnimTab';
// import UserProfile from './screens/UserProfile';

import Colors from './constants/Colors';

import { Provider, MD2DarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
  
    const backgroundStyle = {
      flex: 1,
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    };
  
    return (
      <Provider theme={isDarkMode ? MD2DarkTheme : PaperDefaultTheme}>
        <NativeBaseProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors.white} />
          <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <RootStack />
          </NavigationContainer>
        </NativeBaseProvider>
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
        {/* <Stack.Screen name="UserProfile" component={UserProfile} /> */}
      </Stack.Navigator>
    );
};

export default App;
