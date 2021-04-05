import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, Modal, Text, View, Button, Pressable, Image } from 'react-native';
// import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageImgurApi from '../imgurAPI/image'
import { Picker } from '@react-native-picker/picker';
import GalerieImgurApi from '../imgurAPI/gallerie'
import { SearchBar } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';

const UploadField = ({ reload }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState({})
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal}>
                    <Text style={styles.title}>Ajouter une image</Text>
                    <Text style={styles.label}>Titre :</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />
                    <Text style={styles.label}>Description :</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        numberOfLines={3}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.label}>Image :</Text>
                        <Pressable color="#85BF25" title="Ajouter image"
                            onPress={async () => {
                                try {
                                    const res = await DocumentPicker.pick({
                                        type: [DocumentPicker.types.images],
                                    });
                                    if (!res)
                                        return

                                    setImage({ uri: res.uri, type: res.type, name: res.name })
                                    console.log("URI", res)
                                    // let data = new FormData()
                                    // data.append('image', { uri: res.uri, type: res.type, name: res.name })
                                    // const response = await fetch('https://api.imgur.com/3/image.json', {
                                    //     method: 'POST',
                                    //     headers: {
                                    //         'Content-Type': 'multipart/form-data',
                                    //         'Authorization': 'Bearer 0c6a31e0c4d11b66ebaf477d648774d5355f59b3',
                                    //     },
                                    //     body: data
                                    // })
                                    // let responseData = await response.json()
                                    // console.log(responseData)
                                } catch (err) {
                                    console.log("ERROR", err)
                                }

                            }}
                        >
                            <Text style={{ backgroundColor: "#4E76C9", height: 28, borderRadius: 2, marginVertical: 16, paddingHorizontal: 20, fontSize: 16, textAlignVertical: 'center' }}>Choisir image</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.imageName}>{image.name}</Text>
                    <View style={styles.space} />
                    <Button
                        title='Annuler'
                        color='#EE4444'
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                    <View style={styles.space} />
                    <Button
                        title='Ajouter'
                        color='#85BF25'
                        onPress={async () => {
                            let data = new FormData()
                            data.append('image', image)
                            if (title.length != 0)
                                data.append('title', title)
                            if (description.length != 0)
                                data.append('description', description)
                            let response = await fetch('https://api.imgur.com/3/image.json', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    'Authorization': 'Bearer 0c6a31e0c4d11b66ebaf477d648774d5355f59b3',
                                },
                                body: data
                            })
                            response = await response.json()
                            if (response.success)
                                reload()
                            
                            // setTitle('')
                            // setDescription('')
                            // setImage({})
                            // setModalVisible(!modalVisible)
                        }}
                    />
                </View>
            </Modal>
            <Pressable
                onPress={async () => setModalVisible(!modalVisible)}
            >
                <Text style={{position: 'absolute', top: 20, left: 20, color:'grey'}}><Icon name="add-circle-outline" style={{fontSize: 25}}></Icon></Text>
                <Text style={styles.addImage}>Ajouter une image</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2B2B2B",
    },
    title: {
        fontSize: 20,
        alignSelf: 'center',
    },
    titleContainer: {
        paddingVertical: 10,
        backgroundColor: '#181817'
    },
    label: {
        fontSize: 16,
        marginVertical: 16,
        textAlignVertical: 'center',
        width: 150
    },
    imageName: {
        fontSize: 16,
        marginVertical: 16,
        textAlignVertical: 'center',
        marginLeft: 20
    },
    input: {
        backgroundColor: '#D1D1D1',
        marginLeft: 20
    },
    button: {
        backgroundColor: '#85BF25'
    },
    space: {
        height: 12
    },
    modal: {
        alignSelf: 'center',
        backgroundColor: "#2B2B2B",
        width: 360,
        marginTop: 100,
        padding: 30
    },
    addImage: {
        alignSelf: 'center',
        fontSize: 16,
        color: "white",
        marginVertical: 20,
        textAlignVertical: 'center'
    }
});

export default UploadField