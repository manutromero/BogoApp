import { StyleSheet } from 'react-native';
import { useFonts, Bitter_700Bold, Bitter_400Regular} from '@expo-google-fonts/bitter';

export default StyleSheet.create({
      wrapperCardRoute:{
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15,
        borderTopColor: "black",
        borderTopWidth: 1
      },
      icon: {
        color: 'black',
        marginRight: 5
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