import React, { useEffect, useState } from 'react'
import { View , Text, Image, Pressable} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function CardDetails(props) {
    const DataRoute =  props.route.params.item
    const RouteID = DataRoute.RouteID
    const [RouteData, SetRouteData] = useState([])
    const entityDetails = firebase.firestore().collection('RouteDetails')

    useEffect(()=>{
        console.log("Usando el Use efect")
        entityDetails.where("RouteID", "==", RouteID)
        .onSnapshot(querySnapshot => {
            const newEntities = []
            querySnapshot.forEach(doc => {
                const entity = doc.data()
                newEntities.push(entity)
            });
            SetRouteData(newEntities)
        },
        error => {
            console.log(error)
        })
    }, [])

    const Element = RouteData[0]

    if(Element){
        return (
            <View>
                <Text>HOLA DESDE CARD DETAILSs {Element.TitleRoute}</Text>
            </View>
        ); 
    }else{
        return (
            <View>
                <Text>Cargando</Text>
            </View>
        );
    }
 
  }
