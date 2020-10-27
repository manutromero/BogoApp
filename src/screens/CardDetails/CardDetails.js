import React, { useEffect, useState } from 'react'
import {Image,Dimensions , StyleSheet, Pressable} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';
import { Spinner, Container, Header, Content, Icon, Accordion, Text, View , Card, CardItem, Button} from 'native-base';
import { render } from 'react-dom';


export default function CardDetails(props) {

    const DataRoute =  props.route.params.item
    const RouteID = DataRoute.RouteID
    
    const [RouteData, SetRouteData] = useState([])
    const [dataArray, SetdataArray] = useState([])


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

        //Peticion a firebase
        entityDetails.where("RouteID", "==", RouteID)
        .onSnapshot(querySnapshot => {
            const newEntities = []
            const dataArray = []
            querySnapshot.forEach(doc => {
                const entity = doc.data()
                newEntities.push(entity)
          
                //Listado datos de puntos
                entity.Points.forEach(item => {
                    dataArray.push(
                        { title: item.Point + ". " +item.Title, content: item.Description, Color: "fff" }
                    )
                })
                
            });
            SetRouteData(newEntities)
            SetdataArray(dataArray)
        },
        error => {
            console.log(error)
        })
      

        //Se Obtiene la ubicacion del usuario
        navigator.geolocation.getCurrentPosition(position => {
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
                <View key={index}>
                    <MapView.Marker   coordinate={{latitude:  element.GeoCoordinates.latitude, longitude: element.GeoCoordinates.longitude}} />
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

    const ClickFuntion = () =>{
        props.navigation.navigate("PointItem")
      }

    if(Element){

        return (
            <View>
                <ScrollView>
                    <View style={styles.marginGeneral}> 
                        <Card>
                            <CardItem header bordered>
                                <Text>{Element.TitleRoute}</Text>
                            </CardItem>
                            <Image  source={{uri: Element.Image}} style = {{height: 250,width: "100%", resizeMode : 'stretch' }} />
                            <CardItem header bordered>
                                <Text>Antes de empezar...</Text>
                            </CardItem>
                            <View style={styles.containerWebView}>
                                <WebView style={styles.containerWebViewMap}
                                    source={{ uri: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/439904874&color=%23848c9c&inverse=false&auto_play=false&show_user=true' }}
                                    />
                            </View> 
                            <CardItem header bordered>
                                <Text>Ruta Historica</Text>
                            </CardItem>
                            {/* INICIO MAPA */}
                            <View>
                                {LATITUDE ? 
                                    <MapView initialRegion={{
                                        latitude: LATITUDE,
                                        longitude: LONGITUDE,
                                        latitudeDelta:  0.009,
                                        longitudeDelta:  0.009,
                                    }}  style={styles.mapStyle}  showsUserLocation = {true}  >
                                        <MapView.Marker coordinate={origin} />
                                        {renderPin(Element)}
                                    </MapView>
                                    :  <Spinner color='green' />}
                            </View>
                                {/* FIN MAPA */}
                            <View>
                            <CardItem header bordered>
                                <Text>Tus Paradas</Text>
                            </CardItem>
                            <Content padder>
                                <Accordion
                                    dataArray={dataArray}
                                    headerStyle={{ backgroundColor: "#b7daf8" }}
                                    contentStyle={{ backgroundColor: "#ddecf8" }}
                                />
                            </Content>
                        </View>
                            <Button block success onPress={() => ClickFuntion()}>
                                <Text>Seleccionar Ruta</Text>
                            </Button>  
                        </Card>
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
