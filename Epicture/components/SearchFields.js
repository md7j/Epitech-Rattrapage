import React, { useState, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, Pressable, Text, View, FlatList } from 'react-native';
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageImgurApi from '../imgurAPI/image'
import { Picker } from '@react-native-picker/picker';
import GalerieImgurApi from '../imgurAPI/gallerie'
import { SearchBar } from 'react-native-elements';
import imgurApiUtils from '../imgurAPI/utils'

const SearchFields = ({ data, callbacks }) => {
    const [searchData, setSearchData] = useState([])
    const [searchQuery, setSearchQuery] = useState(data.searchQuery);
    const [section, setSection] = useState(data.section);
    const [sort, setSort] = useState(data.sort);

    const search = (query) => {
        setSearchData([])
        GalerieImgurApi.search(sort, query || searchQuery)
        .then(response => {
            callbacks.setQueryAndData(searchQuery, response)
        });
}

    const searchAutocomplete = (text) => GalerieImgurApi.searchAutocomplete(text).then(response => {
        if (response.length != 0)
            setSearchData(response)
        else
            setSearchData([{ "images": 0, "text": text, "type": "text" }])
    });

    const renderSearchItem = ({ item }) => {
        if (item.type === 'tag') {
            return (
                <Pressable
                    onPress={() => {
                        setSearchQuery(item.text)
                        search(item.text)
                        console.log("pressed" + item.text)
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? '#85BF25'
                                : '#2B2B2B'
                        },
                        styles.searchItem
                    ]}
                >
                    {/* <View style={styles.searchItem}> */}
                    <Text style={styles.searchItemTag}>#{item.text}</Text>
                    <Text style={styles.searchItemNumber}>{item.images}</Text>
                    {/* </View> */}
                </Pressable>
            )
        } else if (item.type === 'text') {
            return (
                <View style={styles.searchItem}>
                    <Text style={styles.searchItemTag}>#{item.text}</Text>
                </View>
            )
        } else if (item.type === 'reset') {
            return (
                <Pressable
                    onPress={() => {
                        if (data.searchQuery.length != 0)
                            callbacks.setQueryAndData('', [])
                        else
                            setSearchData([])
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed
                                ? '#85BF25'
                                : '#2B2B2B'
                        },
                        styles.searchItem
                    ]}
                >
                    {/* <View style={styles.searchItem}> */}
                    <Text style={styles.searchItemReset}>{item.text}</Text>
                    {/* </View> */}
                </Pressable>
            )
        }
    }
    
    return (
        <View>
            <View style={styles.filters}>
                <View style={styles.filter}>
                    <Icon
                        name="caret-down-outline"
                        style={styles.pickerIcon}
                    />
                    <Picker
                        placeholderStyle={{ color: "#E2E2E2" }}
                        placeholderIconColor={"#E2E2E2"}
                        style={styles.pickerContent}
                        selectedValue={sort}
                        onValueChange={(itemValue, itemIndex) => {
                            // if (searchQuery === '')
                            //     callbacks.setQueryAndData('', [])
                            // else
                                search(searchQuery)
                            callbacks.setSort(itemValue)
                        }}>
                        <Picker.Item label="Viral" value="viral" />
                        <Picker.Item label="Top" value="top" />
                        <Picker.Item label="Date" value="time" />
                    </Picker>
                </View>
                <View style={styles.filter}>
                    <Icon
                        name="caret-down-outline"
                        style={styles.pickerIcon}
                    />
                    <Picker
                        placeholderStyle={{ color: "#E2E2E2" }}
                        placeholderIconColor={"#E2E2E2"}
                        style={styles.pickerContent}
                        selectedValue={section}
                        onValueChange={(itemValue, itemIndex) => {
                            // if (searchQuery === '')
                            //     callbacks.setQueryAndData('', [])
                            // else
                                search(searchQuery)
                            callbacks.setSection(itemValue)
                        }}>
                        <Picker.Item label="Hot" value="hot" />
                        <Picker.Item label="Top" value="top" />
                        <Picker.Item label="User" value="user" />
                    </Picker>
                </View>
            </View>
            <SearchBar
                round
                searchIcon={{ size: 24 }}
                containerStyle={styles.containerStyle}
                onSubmitEditing={search}
                onChangeText={(text) => {
                    if (text.length > 0) {
                        searchAutocomplete(text)
                    } else {
                        if (data.searchQuery.length != 0)
                            setSearchData([{"images": 0, "text": "Annuler la recherche", "type": "reset"}])
                        else
                            setSearchData([])
                    }
                    setSearchQuery(text);
                }}
                onClear={() => {
                    if (data.searchQuery.length != 0)
                        setSearchData([{"images": 0, "text": "Annuler la recherche", "type": "reset"}])
                    else
                        setSearchData([])
                    setSearchQuery('');
                }}
                placeholder="Tapez quelque chose ..."
                value={searchQuery}
            />
            <FlatList
                data={searchData}
                renderItem={renderSearchItem}
                keyExtractor={item => item.text}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "#2B2B2B"
    },
    filters: {
        // flex: 1,
        flexDirection: 'row'
    },
    filter: {
        backgroundColor: "#2B2B2B",
        width: 200
    },
    pickerIcon: {
        color: "white",
        position: "absolute",
        top: 20,
        right: 20,
        fontSize: 20
    },
    pickerContent: {
        marginHorizontal: 10,
        color: "white",
        backgroundColor: "blue",
        borderWidth: 0
    },
    searchItem: {
        // backgroundColor: "#2B2B2B",
        paddingVertical: 4,
        marginTop: 1,
        paddingHorizontal: 15
    },
    searchItemTag: {
        fontSize: 23,
        color: '#4E76C9'
    },
    searchItemReset: {
        fontSize: 23,
        color: '#572424'
    },
    searchItemNumber: {
        position: 'absolute',
        marginTop: 1,
        right: 10,
        fontSize: 23,
    },
});

export default SearchFields