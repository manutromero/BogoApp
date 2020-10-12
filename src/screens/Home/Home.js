import React, { Component, useEffect, useState } from 'react'
import { View , Text, Image, FlatList} from 'react-native';
import styles from './styles';
import CardItem from '../CardItem/CardItem'

export default function Home({navigation}) {

  const [query] = useState([{Hola: "Mundo"},{Hola: "Mundo"},{Hola: "Mundo"},{Hola: "Mundo"},{Hola: "Mundo"},{Hola: "Mundo"},]);
  
  console.log("Hola Mundo",query)
  
  const ClickFuntion = () =>{
    console.log("click")
    
    navigation.navigate('CardDetails')
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
        data={query}
        horizontal={false}
        renderItem={({ item }) => <CardItem onPress={() => ClickFuntion()}/>}
      /> 
    </View>
  </View>
  );

}
