import React, { useEffect, useState } from 'react'
import { View , Image, Pressable} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faClock , faMapMarkerAlt, faLandmark, faStarHalfAlt, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';


export default function CardItems({item, onPress}) {

    return (
        <Pressable onPress={onPress}>     
              <Card style={{flex: 0}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: item.thumbnail}} />
                    <Body>
                      <Text>{item.TitleRoute}</Text>
                      <Text note>{item.Dates}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Image source={{uri: item.Image}} style={{height: 200, width: '100%', flex: 1}}/>
                    <Text>
                        {item.ShortDescription}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent style={{ width: '33%'}}>
                        <FontAwesomeIcon icon={ faMapMarkerAlt }/>
                         <Text  style={{ marginLeft: -12, textAlign: "center", color:"#000"}}>{item.Poinst} Puntos</Text>
                    </Button>
                    <Button transparent style={{ width: '33%'}}>
                        <FontAwesomeIcon icon={ faClock } />
                         <Text style={{ marginLeft: -12, textAlign: "center", color:"#000"}}>{item.Time} minutos</Text>
                    </Button>
                    <Button transparent style={{ width: '33%'}}>
                        <FontAwesomeIcon icon={ faLandmark } style={{ marginRight:5}}/>
                        <Text style={{ marginLeft: -12,textAlign: "center", color:"#000"}}>{item.PointsInterest} Sitios de interes</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
        </Pressable>
    );
  }
