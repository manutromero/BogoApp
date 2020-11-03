import React, { Component, useEffect, useState } from 'react'
import { Image, FlatList, ScrollView} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from './style';
import { WebView } from 'react-native-webview';
import { Spinner, Container, Header, Content, Icon, Accordion, Text, View , Card, CardItem, Button} from 'native-base';


export default function PointItem(props) {

  const DataRoute =  props.route.params.Element.Element
  const [pointVisible, setpointVisible] = useState(0)
  const [LATITUDE, SetLATITUDE] = useState(0)
  const [LONGITUDE, SetLONGITUDE] = useState(0) 
  const origin = {latitude: LATITUDE, longitude: LONGITUDE};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBhkw0ERvVFM7VvQOcNRH4AzQh3SITBxvY'; 
  useEffect(()=>{

    //Se Obtiene la ubicacion del usuario
    navigator.geolocation.getCurrentPosition(position => {
        SetLATITUDE(position.coords.latitude)
        SetLONGITUDE(position.coords.longitude)
        setpointVisible(0)
    }, error => {
        console.log("error",error)
    },{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

}, [])

console.log("DataRoute",DataRoute)

const ChangeRoute = (Element, Accion)=>{ 
    console.log("Element",Element)
    if(Accion == "next"){
        if(Element.DataRoute.Points.length > pointVisible){
            setpointVisible(pointVisible + 1)   
        }
    }else{
        if(!pointVisible <= 0){
            setpointVisible(pointVisible - 1)
        }
    }
}

const renderContent = (Element, pointVisible) => {
    let renderContent = []
    console.log("Element")
    renderContent.push(
        <Card>
            <CardItem header bordered>
                <Text>{ Element.Points[pointVisible].Point + ". " + Element.Points[pointVisible].Title}</Text>
            </CardItem>
            <CardItem header bordered>
                <Text>Dale Play para escuchar la historia</Text>
            </CardItem>
            <View style={styles.containerWebView}>
                <WebView style={styles.containerWebViewMap}
                    source={{ uri: Element.Points[pointVisible].Audio[0].URL }}
                    />
            </View> 
            <Image  source={{uri: Element.Points[pointVisible].Images[0]}} style = {{height: 250,width: "100%", resizeMode : 'stretch' }} />
            <CardItem header bordered>
                <Text>Datos Relacionados</Text>
            </CardItem>
            {Element.Points[pointVisible].RelatedData[0] == 0 ? <CardItem header bordered>
                <Text>No contamos con datos relacionados</Text>
            </CardItem>: 
            <View>
                <CardItem header bordered>
                    <Text>{Element.Points[pointVisible].RelatedData[0].Title}</Text>
                </CardItem>
                <CardItem bordered>
                    <Text>
                        {Element.Points[pointVisible].RelatedData[0].Description}
                    </Text>
                </CardItem>
                    <View style={styles.containerWebView}>
                        <WebView style={styles.containerWebViewMedia}
                            source={{ uri: Element.Points[pointVisible].RelatedData[0].URL }}
                            />
                    </View> 
                </View>
            }
            </Card>
    )

    return renderContent
}

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
                { renderContent(DataRoute,pointVisible)}
            </View>
           
                {DataRoute.Points.length == pointVisible + 1 ?   
                    <Card> 
                        <View style={styles.WrapperBtnComplete}>
                            <Button style={styles.WrapperBtnWidth} bordered danger onPress={() => ChangeRoute({DataRoute}, "Prev")}>
                                <Icon name='arrow-back' />
                                    <Text>Anterior</Text>
                            </Button>
                        </View>  
                    </Card> :  

                 
                    <Card> 
                        {pointVisible == 0 ?
                        
                        <View style={styles.WrapperBtnComplete}>
                            <Button style={styles.WrapperBtnWidth} bordered onPress={() => ChangeRoute({DataRoute}, "next")}>
                                <Text>Siguiente</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </View> 

                        :

                        <View style={styles.WrapperBtn}>
                            <Button bordered danger onPress={() => ChangeRoute({DataRoute}, "Prev")}>
                                <Icon name='arrow-back' />
                                    <Text>Anterior</Text>
                            </Button> 
                            <Button bordered onPress={() => ChangeRoute({DataRoute}, "next")}>
                                <Text>Siguiente</Text>
                                <Icon name='arrow-forward' />
                            </Button>
                        </View> }
                      
                    </Card>
                }
            
            </ScrollView>    
    </View>
  );

}
