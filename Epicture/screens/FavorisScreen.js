import * as React from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Text, View } from 'react-native';

// import { RootStackParamList } from '../types';
// import { StackNavigationProp } from '@react-navigation/stack';

const FavorisScreen = () => {
    return (
        <View style={styles.container}>
            <Text>FavorisScreen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#2B2B2B'
    },
});

export default FavorisScreen;