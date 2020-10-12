import React, { Component, useEffect, useState } from 'react'
import { View , Text, Image, FlatList} from 'react-native';
import styles from './styles';
import CardItem from '../CardItem/CardItem'
import { firebase } from '../../firebase/config';


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
    <Text style={styles.TextTitleApp}>BogoApp</Text>
    <View>
      <Image source={require('../../assets/Images/Home-PlazaBolivar.jpg')} style = {{height: 250,width: "100%", resizeMode : 'stretch' }} />
    </View>
    <View>
      <Text onPress={ClickFuntion} style={styles.TitleSection}>Nuestras Rutas</Text> 
      <FlatList
        data={RouteShortData}
        horizontal={false}
        renderItem={({ item }) => <CardItem item={item} onPress={() => ClickFuntion(item)}/>}
      /> 
    </View>
  </View>
  );

}
