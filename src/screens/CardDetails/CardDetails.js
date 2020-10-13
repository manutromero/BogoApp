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

    const [LATITUDE, SetLATITUDE] = useState(0)
    const [LONGITUDE, SetLONGITUDE] = useState(0)

    const origin = {latitude: LATITUDE, longitude: LONGITUDE};
  
    const destination = {latitude: 4.531460, longitude: -74.118525};
    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
   
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const GOOGLE_MAPS_APIKEY = 'AIzaSyBhkw0ERvVFM7VvQOcNRH4AzQh3SITBxvY'; 


    useEffect(()=>{
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

        navigator.geolocation.getCurrentPosition(position => {
            console.log(position, "MI ubicacion")
            SetLATITUDE(position.coords.latitude)
            SetLONGITUDE(position.coords.longitude)
        }, error => {
            console.log("error",error)
        },{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    }, [])

    const Element = RouteData[0]


    if(Element){
        return (
            <View>
                <Text>HOLA DESDE CARD DETAILS {Element.TitleRoute}</Text>
                
                {LATITUDE ? 
                
                <MapView initialRegion={{
                    latitude: 4.510295,
                    longitude: -74.112527,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}  style={styles.mapStyle}>
                    <MapView.Marker coordinate={origin} />
                    <MapView.Marker coordinate={destination} />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                     <MapViewDirections
                        origin={{latitude:  4.755079, longitude: -74.044932}}
                        destination={{latitude:  4.762826, longitude: -74.046279}}
                        apikey={GOOGLE_MAPS_APIKEY}
                    />
                </MapView>
                 : <Text>CARGANDO MAPITA</Text>}
              
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
