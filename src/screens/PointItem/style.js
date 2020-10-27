import { StyleSheet , Dimensions} from 'react-native';

export default StyleSheet.create({
      mapStyle: {
        width: Dimensions.get('window').width/1.05,
        height: Dimensions.get('window').height/2
      },
      marginGeneral:{
        marginLeft:5,
        marginRight:5
      }
})