import { StyleSheet , Dimensions} from 'react-native';

export default StyleSheet.create({
    TitleCard:{
        fontSize: 30,
        marginBottom: 10,
        marginTop: 10
    },
    containerWebViewMap:{
        width: '100%',
        height: 20
    },
    containerWebView: {
       flex: 1,
        width: '100%',
        marginBottom: 20
      },
      mapStyle: {
        width: Dimensions.get('window').width/1.1,
        height: Dimensions.get('window').height/2,
      },
      marginGeneral:{
        marginLeft:15,
        marginRight:15
      }
})