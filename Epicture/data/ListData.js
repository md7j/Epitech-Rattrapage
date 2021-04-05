import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function listData() {
    try {
        console.log("LIST DATA")
        await AsyncStorage.getAllKeys().then(console.log)
        console.log("=========")
    } catch (error) {
        console.log(error.message);
    }
};