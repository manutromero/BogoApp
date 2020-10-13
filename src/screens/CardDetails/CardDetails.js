import React, { useEffect, useState } from 'react'
import { View , Text, Image,Dimensions , StyleSheet, Pressable} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function CardDetails(props) {
    const DataRoute =  props.route.params.item
    const RouteID = DataRoute.RouteID
    const [RouteData, SetRouteData] = useState([])
    const entityDetails = firebase.firestore().collection('RouteDetails')
    const LATITUDE = 4.510295;
    const LONGITUDE = -74.112527;
    const origin = {latitude: LATITUDE, longitude: LONGITUDE};
    const destination = {latitude: 4.604485, longitude: -74.069724};
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
   
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBhkw0ERvVFM7VvQOcNRH4AzQh3SITBxvY'; 


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
                <Text>HOLA DESDE CARD DETAILS {Element.TitleRoute}</Text>
                <MapView initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}  style={styles.mapStyle}>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
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
