import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function retrieveData(key) {
    console.log("EZEZEZ")
    try {
        const value = await AsyncStorage.getItem(key)
        return value;
    } catch (error) {
        console.log(error.message);
    }
};