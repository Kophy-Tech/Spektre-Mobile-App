import React from 'react';
import {  Linking } from 'react-native';
import { WebView } from 'react-native-webview';
const WebviewScreen = () => {
    const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';

    return (
        <WebView
            source={{ uri }}
            onShouldStartLoadWithRequest={(request) => {
                if (request.url !== uri) {
                    Linking.openURL(request.url);
                    return false;
                }

                return true;
            }}
        />
    )
}

export default WebviewScreen