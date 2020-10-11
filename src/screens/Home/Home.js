import React, { useEffect, useState } from 'react'
import { View , Text} from 'react-native';
import styles from './styles';
import { WebView } from 'react-native-webview';

export default function Home(props) {

    return (
      <View style={styles.container}>
      <Text>Hola Mundo</Text>
      <View  style={styles.containerWebView}>
        <WebView
                  source={{ uri: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/439904874&color=%23848c9c&inverse=false&auto_play=false&show_user=true' }}
              />
      </View>
      </View>
      
    );
  }
