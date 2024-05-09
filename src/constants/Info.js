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