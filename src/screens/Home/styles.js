import { StyleSheet } from 'react-native';
import { useFonts, Bitter_700Bold, Bitter_400Regular} from '@expo-google-fonts/bitter';

export default StyleSheet.create({
    container:{
      flex:1,
      marginLeft: 10,
      marginRight: 10
    },
    containerWebView: {
        width: '100%',
        height: 20
      },
      HomeImage:{
        width: '100'
      },
      TextTitleApp:{
        fontSize: 40,
        textAlign: "center",
        margin: 5,
        fontFamily: 'Bitter_700Bold'
      },
      TitleSection:{
        fontSize: 25,
        textAlign: "left",
        margin: 5,
        fontFamily: 'Bitter_700Bold',
        marginRight: 15,
        marginLeft: 15
      },
      wrapperCardRoute:{
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
        borderTopColor: "black",
        borderTopWidth: 1
      },
      icon: {
        color: 'black'
      },
      TitleCard:{
        fontSize: 21,
        fontFamily: 'Bitter_700Bold',
      },
      wrapperInfoPoints:{
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: 5
      },
      itemPoins:{
        flexDirection: "row",
      },
      TextIndoCard: {
        minHeight: 40,
      }
})