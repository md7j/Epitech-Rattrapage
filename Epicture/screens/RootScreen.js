import * as React from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Text, View } from 'react-native';

// import { RootStackParamList } from '../types';
// import { StackNavigationProp } from '@react-navigation/stack';
import retrieveData from '../data/RetrieveData';


const RootScreen = ({ navigation }) => {
    retrieveData('userToken').then((userToken) => {
        // navigation.setParams({userToken : userToken})
        navigation.reset({
            index: 0,
            // actions: [navigation.navigate({ name: userToken ? 'Epicture' : 'Auth', params: {userToken : userToken}})],
            routes: [{ name: userToken ? 'Epicture' : 'Auth', params: {userToken : userToken} }],
        });
        // navigation.reset(userToken ? 'Epicture' : 'Auth', {userToken : userToken})
        // navigation.reset({
        //     key: null,
        //     index: 0,
        //     actions: [navigation.navigate('Auth')],
        //   })
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#85BF25" />
            <StatusBar barStyle="default" />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b2b2b",
        justifyContent: 'center',
    },
});

export default RootScreen;