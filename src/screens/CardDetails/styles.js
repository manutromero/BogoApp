import { StyleSheet , Dimensions} from 'react-native';

export default StyleSheet.create({
    TitleCard:{
        fontSize: 30,
        marginBottom: 10,
        marginTop: 10
    },
    containerWebViewMap:{
        width: '90%',
        height: 20,
        marginLeft: "5%",
        marginTop: "3%"
    },
    containerWebView: {
       flex: 1,
        width: '100%',
        marginBottom: 20
      },
      mapStyle: {
        width: Dimensions.get('window').width/1.05,
        height: Dimensions.get('window').height/2
      },
      marginGeneral:{
        marginLeft:5,
        marginRight:5
      }
})