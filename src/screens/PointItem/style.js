import { StyleSheet , Dimensions} from 'react-native';

export default StyleSheet.create({
      mapStyle: {
        width: Dimensions.get('window').width/1.05,
        height: Dimensions.get('window').height/2
      },
      marginGeneral:{
        marginLeft:5,
        marginRight:5
      },
      containerWebViewMap:{
        width: '90%',
        height: 20,
        marginLeft: "5%",
        marginTop: "3%"
    },
    containerWebViewMedia:{
      width: '90%',
      height: 250,
      marginLeft: "5%",
      marginTop: "3%"
  },
    containerWebView: {
       flex: 1,
        width: '100%',
        marginBottom: 20
      },
})