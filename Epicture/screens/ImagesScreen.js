import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Text, View, FlatList, Button } from 'react-native';
import ImageItem from '../components/ImageItem'
import ImagesImgurApi from '../imgurAPI/images'
import UploadField from '../components/UploadField'


const ImagesScreen = ({ userToken }) => {
    const [data, setData] = useState()

    const renderItem = ({ item }) => <ImageItem data={item} userToken={userToken} />

    console.log("ImagesScreen")
    if (data) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <UploadField reload={() => setData()} />
                </View>
                <View style={styles.images}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        )
    }

    ImagesImgurApi.getData(userToken.accountUsername, userToken.accessToken).then(response => setData(response))

    return (
        <View>
            <ActivityIndicator size="large" color="#85BF25" style={{ marginTop: 30 }} />
            <StatusBar barStyle="default" />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181817',
    },
    images: {
        alignItems: 'center',
    }
});

export default ImagesScreen;