import React, { Component, useEffect, useState } from 'react'
import { View , Image, FlatList} from 'react-native';
import styles from './styles';
import CardsItem from '../CardItem/CardItem'
import { firebase } from '../../firebase/config';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


export default function Home({navigation}) {
  const [RouteShortData, setRouteShortData] = useState([])
  const RouteEntity = firebase.firestore().collection('Routes')

  useEffect(()=>{
    console.log("Usando el Use efect")
    RouteEntity.onSnapshot(querySnapshot => {
        const newEntities = []
        querySnapshot.forEach(doc => {
            const entity = doc.data()
            newEntities.push(entity)
        });
        setRouteShortData(newEntities)
    },
    error => {
        console.log(error)
    })
}, [])

  console.log("RouteShortData",RouteShortData)

  const ClickFuntion = (item) =>{
      console.log("item--",item)
      navigation.navigate('CardDetails',{item})
    }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.TextTitleApp}>BogoApp</Text>
        <View>
          <Image source={require('../../assets/Images/Home-PlazaBolivar.jpg')} style = {{height: 250,width: "100%", resizeMode : 'stretch' }} />
        </View>
        <View>
          <Text onPress={ClickFuntion} style={styles.TitleSection}>Nuestras Rutas</Text> 
          <FlatList
            data={RouteShortData}
            horizontal={false}
            renderItem={({ item }) => <CardsItem item={item} onPress={() => ClickFuntion(item)}/>}
          /> 
        </View>
    </ScrollView>
  </View>
  );

}
