import React, { Component, useEffect, useState } from 'react'
import { View , Image, FlatList} from 'react-native';
import styles from './styles';
import CardsItem from '../CardItem/CardItem'
import { firebase } from '../../firebase/config';
import { Container,Item, Header, Title,  Right, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';


export default function Home({navigation}) {
  const [RouteShortData, setRouteShortData] = useState([])
  const RouteEntity = firebase.firestore().collection('Routes')

  useEffect(()=>{
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


  const ClickFuntion = (item) =>{
      navigation.navigate('CardDetails',{item})
    }
  return (
    <View>
      <ScrollView>
        <Card>
              <View>
                <Image source={require('../../assets/Images/Home-Image.jpg')} style = {{height: 250,width: "100%", resizeMode : 'stretch' }} />
              </View>
            </Card>
            <View>
              <CardItem header bordered>
                <Text onPress={ClickFuntion}>Nuestras Rutas</Text> 
              </CardItem>
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
