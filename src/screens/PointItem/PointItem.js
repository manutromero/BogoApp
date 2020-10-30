import React, { Component, useEffect, useState } from 'react'
import { Image, FlatList, ScrollView} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './style';
import { WebView } from 'react-native-webview';
import { Spinner, Container, Header, Content, Icon, Accordion, Text, View , Card, CardItem, Button} from 'native-base';


export default function PointItem(props) {

  const DataRoute =  props.route.params.Element.Element

  const [LATITUDE, SetLATITUDE] = useState(0)
  const [LONGITUDE, SetLONGITUDE] = useState(0)
  const origin = {latitude: LATITUDE, longitude: LONGITUDE};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBhkw0ERvVFM7VvQOcNRH4AzQh3SITBxvY'; 
  useEffect(()=>{

    //Se Obtiene la ubicacion del usuario
    navigator.geolocation.getCurrentPosition(position => {
        SetLATITUDE(position.coords.latitude)
        SetLONGITUDE(position.coords.longitude)
    }, error => {
        console.log("error",error)
    },{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

}, [])

console.log("DataRoute",DataRoute)

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
                  mode={"WALKING"}
                  strokeWidth={4}
                  strokeColor={element.strokeColor}
              />
          </View>
      )
  }
  return renderMapPin
}

  return (
    <View>
            <ScrollView>
        {/* INICIO MAPA */}
        <Card>
            <View>
                {LATITUDE ? 
                    <MapView initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta:  0.009,
                        longitudeDelta:  0.009,
                    }}  style={styles.mapStyle}  showsUserLocation = {true}  >
                        <MapView.Marker coordinate={origin} />
                        {renderPin(DataRoute)}
                    </MapView>
                    :  <Spinner color='green' />}
            </View>
        </Card>
            {/* FIN MAPA */}  

            <View>
                <Card> 
                    <CardItem header bordered>
                        <Text>{ DataRoute.Points[0].Point + ". " + DataRoute.Points[0].Title}</Text>
                    </CardItem>
                    <CardItem header bordered>
                        <Text>Dale Play para escuchar la historia</Text>
                    </CardItem>
                    <View style={styles.containerWebView}>
                        <WebView style={styles.containerWebViewMap}
                            source={{ uri: DataRoute.Points[0].Audio[0].URL }}
                            />
                    </View> 
                    <Image  source={{uri: DataRoute.Points[0].Images[0]}} style = {{height: 250,width: "100%", resizeMode : 'stretch' }} />
                    <CardItem header bordered>
                        <Text>Datos Relacionados</Text>
                    </CardItem>
                    <View>
                        <CardItem header bordered>
                            <Text>{DataRoute.Points[0].RelatedData[0].Title}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Text>
                                {DataRoute.Points[0].RelatedData[0].Description}
                            </Text>
                        </CardItem>
                        <View style={styles.containerWebView}>
                            <WebView style={styles.containerWebViewMedia}
                                source={{ uri: DataRoute.Points[0].RelatedData[0].URL }}
                                />
                        </View> 
                    </View>
                </Card>
            </View>
        </ScrollView>
  </View>
  );

}
