import { StyleSheet } from "react-native-web";
import colors from "./colors";
import fonts from "./fonts";

export default global = StyleSheet.create({
  PageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  LoginAndRegisterPageContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  LoginAndRegisterContainer: {
    flex: 1,
    width: "25%",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  LoginAndRegisterHeaderText: { // Also SecondLogin and ForgotPassword
    marginTop: 5,
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    fontWeight: "bold",
    color: colors.primary,
  },
  Icon: {
    flex: 1,
    right: 10,
    position: "absolute",
  },
  TextInput: {
    flex: 1,
    height: 50,
    padding: 10,
    paddingRight: 40,
    //fontFamily: fonts.primary
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.secondary,
    //fontFamily: fonts.primary
  },
  ListItemText:{
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.primary,
    //fontFamily: fonts.primary
  },
  MenuButton: {
    margin: 10,
    width: "20%",
    height: "75%",
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowRadius:5,
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  MenuButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    textAlign: "center",
    color: colors.primary,
    //fontFamily: fonts.primary
  },
  SmallButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  SmallButtonText: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: colors.smallButtonTextColor,
    //fontFamily: fonts.primary
  },
  LoginAndRegisterButton: { // Also SecondLogin and ForgotPassword
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: colors.primary,
    margin: 10,
  },
  SecondLoginContainer: { // Also ForgotPassword
    flex: 1,
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  SecondLoginView: { // Also ForgotPassword
    flex: 1,
    marginTop: 10,
    flexDirection: "col",
  },
  HeaderMenu: {
    flex: 0.1,
    borderBottomWidth: 1,
    borderRadius: 0,
    borderBottomColor: "black",
    marginBottom: 15,
    backgroundColor: colors.parentMenuBorder,
  },
  HeaderText: {
    color: colors.primary,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    //fontFamily: fonts.primary,
    letterSpacing:3,
  },
  TextView: {
    flex: 1,
  },
  RefreshButton: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  RightContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop:15,
    flexDirection: "col",
    justifyContent: "space-evenly",
  },
  RightMenu: {
    flex: 1,
    flexDirection: "col",
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: colors.primary,
    backgroundColor: colors.borderRightColor,
  },
  MenuRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ArrowView: {
    flexDirection: "row",
    height: 25,
    backgroundColor: colors.borderRightColor,
  },
  ButtonList: {
    shadowRadius:5,
    flexDirection: "row",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.5,
    textAlign: "left",
    alignItems: "center",
    borderRadius: 5,
    height: 50,
    margin: 5,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: "space-between",
    color: colors.primary,
    backgroundColor: colors.secondary,
  },
  TextInputInModal: {
    height: 35,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  IconButton: {
    marginLeft: 10,
  },
  ListView: {
    flex: 1,
    marginTop: 40,
  },
  ArrowButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  ModalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalContainer: {
    flex: 0.8,
    flexDirection: "col",
    width: "70%",
    borderWidth: 2,
    borderRadius: 5,
    shadowRadius: 20,
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
  ModalConfigContainer: {
    flex: 0.4,
    flexDirection: "col",
    width: "40%",
    borderWidth: 2,
    borderRadius: 5,
    shadowRadius: 20,
    borderColor: colors.primary,
    backgroundColor: colors.secondary,
  },
  TopModalView: {
    flex: 1,
  },
  BottomModalView: {
    flexDirection: "row",
  },
  CloseButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "white",
    borderLeftColor: "white",
    backgroundColor: colors.primary,
  },
  SendButton: {
    height: 50,
    width: 150,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  ErrorMsg: {
    color: colors.ErrorTextColor,
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});