import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Pressable, Text, View, FlatList } from 'react-native';
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageImgurApi from '../imgurAPI/image'
import imgurApiUtils from '../imgurAPI/utils';

const ImageItem = ({ data, userToken }) => {
    const [voted, setVoted] = useState(data.vote)
    const [imageData, setImageData] = useState(data)
    const sendVote = (vote) => {
        fetch('https://api.imgur.com/3/gallery/' + data.id + '/vote/' + vote, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken.accessToken
            }
        })
        let newImageData = imageData
        if (vote === 'up' && newImageData.vote != 'up') {
            newImageData.ups += 1
            if (newImageData.vote === 'down')
                newImageData.downs -= 1
        }
        if (vote === 'down' && newImageData.vote != 'down') {
            newImageData.downs += 1
            if (newImageData.vote === 'up')
                newImageData.ups -= 1
        }
        newImageData.vote = vote
        setVoted(vote)
        setImageData(newImageData)
    }
    return (
        <View style={styles.item}>
            <Image
                width={320}
                style={styles.image}
                source={{ uri: imageData.link }}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{imageData.title}</Text>
                <View style={styles.footer}>
                    <Pressable onPress={() => sendVote("up")}>
                        <Text style={styles.title}><Icon name="arrow-up" size={15} color={imageData.vote === "up" ? "green" : "white"} /> {imageData.ups}</Text>
                    </Pressable>
                    <Pressable onPress={() => sendVote("down")}>
                        <Text style={styles.title}><Icon name="arrow-down" size={15} color={imageData.vote === "down" ? "red" : "white"} /> {imageData.downs}</Text>
                    </Pressable>
                    <Text style={styles.title}><Icon name="chatbubble-ellipses" size={15} color="white" /> {imageData.comments}</Text>
                    <Text style={styles.title}><Icon name="eye-outline" size={15} color="white" /> {imageData.views}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#2B2B2B',
        borderRadius: 5,
        width: 320
    },
    title: {
        fontSize: 15,
        paddingTop: 10,
        fontWeight: "bold",
        paddingHorizontal: 10
    },
    image: {
        // borderRadius: 5,r
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    content: {
        // paddingVertical: 10
        width: 300
    },
    footer: {
        borderTopColor: "#D1D1D1",
        borderTopWidth: 2,
        marginVertical: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-around'
    }
});

export default ImageItem