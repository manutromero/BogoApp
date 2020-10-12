import React, { useEffect, useState } from 'react'
import { View , Text, Image, Pressable} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faClock , faMapMarkerAlt, faLandmark, faStarHalfAlt, faChevronRight} from '@fortawesome/free-solid-svg-icons'

export default function CardItem({item, onPress}) {

    return (
        <Pressable onPress={onPress}>
            <View style={styles.wrapperCardRoute}>
                <Text style={styles.TitleCard}>{item.TitleRoute}</Text>
                <Text style={styles.TextIndoCard}> {item.ShortDescription} </Text>
                <View style={styles.wrapperInfoPoints}>
                    <View style={styles.itemPoins}>
                    <FontAwesomeIcon icon={ faMapMarkerAlt } />
                    <Text> {item.Poinst} Puntos </Text>             
                    </View>
                    <View  style={styles.itemPoins}>
                        <FontAwesomeIcon icon={ faClock }  />
                        <Text>{item.Time} minutos </Text>             
                    </View>
                    <View  style={styles.itemPoins}>
                        <FontAwesomeIcon icon={ faLandmark }  />
                        <Text> {item.PointsInterest} Sitios de interes </Text>             
                    </View>
                </View>
                <View style={styles.wrapperInfoPoints}>
                    <View  style={styles.itemPoins}>
                        <Text> Elegir Ruta </Text>    
                        <FontAwesomeIcon icon={ faChevronRight } />         
                    </View>
                </View>
            </View>
        </Pressable>
    );
  }
