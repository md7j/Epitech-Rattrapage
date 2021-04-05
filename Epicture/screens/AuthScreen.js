import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, Button, Image, View } from 'react-native';
import { WebView } from 'react-native-webview';

// import { RootStackParamList } from '../types';
// import { StackNavigationProp } from '@react-navigation/stack';
import storeData from '../data/StoreData';

const AuthScreen = ({navigation}) => {
    const [showWebView, setShowWebView] = useState(false)
    const extractFromUrl = function (url) {
        const userToken = {
            accessToken: url.substring(url.indexOf("access_token=") + "access_token=".length, url.indexOf("&expires_in=")),
            expiresIn: url.substring(url.indexOf("&expires_in=") + "&expires_in=".length, url.indexOf("&token_type=")),
            tokenType: url.substring(url.indexOf("&token_type=") + "&token_type=".length, url.indexOf("&refresh_token=")),
            refreshToken: url.substring(url.indexOf("&refresh_token=") + "&refresh_token=".length, url.indexOf("&account_username=")),
            accountUsername: url.substring(url.indexOf("&account_username=") + "&account_username=".length, url.indexOf("&account_id=")),
            accountId: url.substring(url.indexOf("&account_id=") + "&account_id=".length, url.length)
        }
        storeData("userToken", JSON.stringify(userToken)).then((item) => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Root' }],
            });
            // navigation.navigate('CheckLogin')r
        }).catch(err => console.log("Err", err))
    }

    const navigationStateChangeHandler = function (WebView) {
        if (WebView.url.includes('access_token=')) {
            extractFromUrl(WebView.url)
        }
    }

    let webViewProps = {
        style: styles.webView,
        javaScriptEnabled: true,
        // incognito: true,
        onNavigationStateChange: navigationStateChangeHandler,
        source: {
            uri: 'https://api.imgur.com/oauth2/authorize?client_id=2e6ef0fb1d5740c&response_type=token'
        },
    }

    const renderWebView = function () {
        console.log("renderWebView")
        return <WebView {...webViewProps} />
    }
    if (showWebView)
        return <WebView {...webViewProps} />
    return (
        <View style={styles.container}>
            {/* { showWebView && renderWebView()} */}
            <Image
                style={styles.logo}
                source={require('../assets/images/logo.jpg')}
            />
            <Button title="Se connecter" color="#85BF25" onPress={() => {
                console.log("ezze")
                setShowWebView(true)
                // navigation.navigate('LoginWebView')
            }} />
            <Image
                style={styles.epitech}
                source={require('../assets/images/epitech.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2B2B2B",
        alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: 200,
    },
    logo: {
        width: 350,
        height: 150,
        marginBottom: 50
    },
    epitech: {
        width: 350,
        height: 150,
        position: 'absolute',
        bottom: 30,
    }
});
export default AuthScreen;