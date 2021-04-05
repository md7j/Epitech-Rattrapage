import * as React from 'react';
import { StyleSheet, Button, Image, Text, View } from 'react-native';

// import { RootStackParamList } from '../types';
// import { StackNavigationProp } from '@react-navigation/stack';
import clearData from '../data/ClearData';

const ProfilScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Se déconnecter</Text>
            <View style={styles.sectionBody}>
                <Button title="Se déconnecter" color="#EE4444" onPress={() => {
                    clearData().then(() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Root' }],
                    }))
                }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#2B2B2B'
    },
    sectionTitle: {
        fontSize: 30
    },
    sectionBody: {
        marginTop: 20
    }
});

export default ProfilScreen;