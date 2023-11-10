import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
    return await AsyncStorage.getItem("lng");
};

export default getData;