import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function clearData() {
    try {
        await AsyncStorage.getAllKeys().then(async (data) => {
            for (const key in data) {
                await AsyncStorage.removeItem(data[key])
            }
        })
    } catch (error) {
        console.log(error.message);
    }
};