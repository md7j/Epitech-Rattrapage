import React, { useState, useCallback  } from 'react';
import { StyleSheet, ActivityIndicator, StatusBar, Text, View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ImageItem from '../components/ImageItem'
import SearchFields from '../components/SearchFields'
import GalerieImgurApi from '../imgurAPI/gallerie'

const GalerieScreen = ({ userToken }) => {
    const [data, setData] = useState([])
    const [section, setSection] = useState('hot');
    const [sort, setSort] = useState('viral');
    const [searchData, setSearchData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const renderImage = ({ item }) => <ImageItem data={item} userToken={userToken} />
    const setQueryAndData = ( query, data ) => {
        setSearchQuery(query)
        setData(data)
    }

    if (data.length === 0) {
        GalerieImgurApi.getData(section, sort).then(response => setData(response))
        return (
            <View>
                <ActivityIndicator size="large" color="#85BF25" style={{ marginTop: 30 }} />
                <StatusBar barStyle="default" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchFields data={{
                    sort: sort,
                    section: section,
                    searchQuery: searchQuery
                }} callbacks={{
                    setQueryAndData: setQueryAndData,
                    setSort: setSort,
                    setSection: setSection
                    }}/>
            </View>
            <View style={styles.images}>
                <FlatList
                    data={data}
                    renderItem={renderImage}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181817',
    },
    images: {
        alignItems: 'center',
        backgroundColor: '#181817',
        // paddingTop: 10,
        // marginVertical: 30,
    },
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
    }
});

export default GalerieScreen;