import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function storeData(key, item) {
    try {
        await AsyncStorage.setItem(key, item)
    } catch (error) {
        console.log(error.message);
    }
};