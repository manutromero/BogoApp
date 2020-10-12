import React, { useEffect, useState } from 'react'
import { View , Text, Image, Pressable} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {  faClock , faMapMarkerAlt, faLandmark, faStarHalfAlt, faChevronRight} from '@fortawesome/free-solid-svg-icons'

export default function CardItem({onPress}) {


    return (
        <Pressable onPress={onPress}>
            <View style={styles.wrapperCardRoute}>
                <Text style={styles.TitleCard}>Bogotazo</Text>
                <Text style={styles.TextIndoCard}>Considerado el hecho historico mas importande de la cuidad</Text>
                <View style={styles.wrapperInfoPoints}>
                    <View style={styles.itemPoins}>
                    <FontAwesomeIcon icon={ faMapMarkerAlt } />
                    <Text>Tiempo </Text>             
                    </View>
                    <View  style={styles.itemPoins}>
                        <FontAwesomeIcon icon={ faClock }  />
                        <Text>80 minutos </Text>             
                    </View>
                    <View  style={styles.itemPoins}>
                        <FontAwesomeIcon icon={ faLandmark }  />
                        <Text> 5 Sitios de interes </Text>             
                    </View>
                </View>
                <View style={styles.wrapperInfoPoints}>
                    <View  style={styles.itemPoins}>
                        <FontAwesomeIcon icon={ faStarHalfAlt }  />
                        <Text> Muy Popular </Text>             
                    </View>
                    <View  style={styles.itemPoins}>
                        <Text> Elegir Ruta </Text>    
                        <FontAwesomeIcon icon={ faChevronRight } />         
                    </View>
                </View>
            </View>
        </Pressable>
    );
  }
