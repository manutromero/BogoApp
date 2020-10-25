import React, { useEffect, useState } from 'react'
import { View , Text, Image,Dimensions , StyleSheet, Pressable} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { Spinner } from 'native-base';


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
            console.log("newEntities",newEntities)
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

    const renderPin = (Element) => {
        let renderMapPin = [];

        for (let index = 0; index < Element.Points.length; index++) {
            const beforeElement = Element.Points[index-1]
            const element = Element.Points[index];
            renderMapPin.push(
                <View>
                    <MapView.Marker coordinate={{latitude:  element.GeoCoordinates.latitude, longitude: element.GeoCoordinates.longitude}} />
                    <MapViewDirections
                        origin={ index == 0 ? origin : {latitude:  beforeElement.GeoCoordinates.latitude, longitude: beforeElement.GeoCoordinates.longitude}}
                        destination={{latitude:  element.GeoCoordinates.latitude, longitude: element.GeoCoordinates.longitude}}
                        apikey={GOOGLE_MAPS_APIKEY}
                        mode={"TRANSIT"}
                        strokeWidth={4}
                        strokeColor={element.strokeColor}
                    />
                </View>
            )
        }
        return renderMapPin
    }

    if(Element){
        return (
            <View>
                <ScrollView>
                    <Image  source={{uri: Element.Image}} style = {{height: 250,width: "100%", resizeMode : 'stretch' }} />
                    <View style={styles.marginGeneral}> 
                        <Text style={styles.TitleCard}>Antes de empezar...</Text>
                        <View style={styles.containerWebView}>
                            <WebView style={styles.containerWebViewMap}
                            source={{ uri: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/439904874&color=%23848c9c&inverse=false&auto_play=false&show_user=true' }}
                            />
                        </View> 
                        <Text style={styles.TitleCard}>Ruta Historica</Text>
                        {/* INICIO MAPA */}
                        <View>
                            {LATITUDE ? 
                                <MapView initialRegion={{
                                    latitude: LATITUDE,
                                    longitude: LONGITUDE,
                                    latitudeDelta:  0.009,
                                    longitudeDelta:  0.009,
                                }}  style={styles.mapStyle} >
                                    <MapView.Marker coordinate={origin} />
                                    {renderPin(Element)}
                                </MapView>
                                :  <Spinner color='green' />}
                        </View>
                        {/* FIN MAPA */}
                        <View>
                        <Text style={styles.TitleCard}>Los Puntos</Text>
                 
                        <View>
                            <View>
                                <Text>Casa de juan roa sierra</Text>
                                <Text>En esta parada conoceremos un poco de la historia de juan roa 
                                sierra persona que termina con la vida de jorge eliecer gaitan</Text>
                            </View>
                            <View>
                                <Text>Casa de juan roa sierra</Text>
                                <Text>En esta parada conoceremos un poco de la historia de juan roa 
                                sierra persona que termina con la vida de jorge eliecer gaitan</Text>
                            </View>
                            <View>
                                <Text>Casa de juan roa sierra</Text>
                                <Text>En esta parada conoceremos un poco de la historia de juan roa 
                                sierra persona que termina con la vida de jorge eliecer gaitan</Text>
                            </View>
                            <View>
                                <Text>Casa de juan roa sierra</Text>
                                <Text>En esta parada conoceremos un poco de la historia de juan roa 
                                sierra persona que termina con la vida de jorge eliecer gaitan</Text>
                            </View>
                        </View>

                    </View>
                        
                    </View>
                 
                </ScrollView>
            </View>
        ); 
    }else{
        return (
            <View>
                 <Spinner color='green' />
            </View>
        );
    }
 
  }
