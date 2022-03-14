import { StyleSheet } from "react-native-web";
import colors from "./colors";
export default global = StyleSheet.create({

    pageContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 15,
      },
      headerMenu:{
        flex: 0.15,
        backgroundColor: colors.sideMenuBorder,
        borderRadius: 5,        
        marginBottom: 15,
        borderWidth:0,
        borderColor: colors.primary,
      },
      headerText: {
        color: "black",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
      },
      leftMenu: {
        flex: 1,
        flexDirection: "col",
        backgroundColor: colors.sideMenuBorder,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5, 
        marginLeft: 15, 
        marginBottom:15,
        borderWidth:0,
        borderColor: colors.primary,
      },
      rightContainer: {
        flex: 1,
        flexDirection: "col",
        justifyContent: "space-evenly",        
        marginLeft: 15, 
        marginRight:15,
      },
      rightMenu: {
        flex: 1,
        flexDirection: "col",
        backgroundColor: colors.borderRightColor,
        borderRadius: 5,  
        marginBottom:15,
        borderWidth:0,
        borderColor: colors.primary,
      },
      ButtonList: {
        fontSize: 15,
        fontWeight: "bold",
        letterSpacing: 0.5,
        color: colors.fontColor,
        textAlign: "left",
        borderRadius: 5,
        height: 50,
        margin: 5,
        paddingLeft: 10,
        justifyContent: "center",
        backgroundColor: colors.primary,
      },
      
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.fontColor,
  },
  
  ListView: {
    flex: 1,
    marginTop: 40,
  },
});