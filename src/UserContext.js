import {createContext,useState} from "react";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useContext } from "react";

const UserType = createContext();

const UserContext = ({children}) => {

    const [user, setUser] = useState(null);
    // const [userId,setUserId] = useState("");

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          if (token) {
            
            const decodedToken = jwt_decode(token);
            setUser(decodedToken);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
  
      fetchUser();
    }, []);

    return (
        <UserType.Provider value={{user, setUser}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType,UserContext}
// export const useAuth = () => useContext(UserType);