import { React } from "react";
import { Text, View, SafeAreaView } from "react-native";
import global from "../config/global";
import ParentMenu from "../components/ParentMenu";
import { ScrollView, StyleSheet, Pressable } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import sizes from "../config/sizes";
//import fonts from "../config/fonts";

const AppDownload = ({ navigation }) => {
  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>Download Software</Text>
        </View>
        <View style={global.RightMenu}>
          <ScrollView style={styles.AccountsView}>
            <Text style={styles.AccountTypeText}>
              BlackEagle Spyware{"\n\n"}
            </Text>
            <AntDesign
              name="windows"
              size={sizes.AppDownloadIconSize}
              color={colors.WindowsIconColor}
            />
            <Text style={styles.AccountsText}>32/64bits OS{"\n"}</Text>
            <Pressable>
              <Text style={styles.PurchaseText}>Download Now{"\n"}</Text>
              <AntDesign
                name="download"
                size={sizes.AppDownloadIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Text>{"\n\n"}</Text>
            <AntDesign
              name="android1"
              size={sizes.AppDownloadIconSize}
              color={colors.AndroidIconColor}
            />
            <Text style={styles.AccountsText}>Google Play{"\n"}</Text>
            <Pressable>
              <Text style={styles.PurchaseText}>Download Now{"\n"}</Text>
              <AntDesign
                name="download"
                size={sizes.AppDownloadIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Text>{"\n\n"}</Text>
            <AntDesign
              name="apple1"
              size={sizes.AppDownloadIconSize}
              color={colors.primary}
            />
            <Text style={styles.AccountsText}>App Store{"\n"}</Text>
            <Pressable>
              <Text style={styles.PurchaseText}>Download Now{"\n"}</Text>
              <AntDesign
                name="download"
                size={sizes.AppDownloadIconSize}
                color={colors.primary}
              />
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AccountsView: {
    flex: 1,
    textAlign: "center",
  },
  AccountTypeText: {
    fontSize: 20,
    fontWeight: 800,
    //fontFamily: fonts.primary,
    //fontStyle:"italic",
    letterSpacing: 3,
  },
  AccountsText: {
    fontSize: 16,
    fontWeight: 400,
    //fontFamily: fonts.primary,
    letterSpacing: 2,
  },
  PurchaseText: {
    fontSize: 17,
    fontWeight: "bold",
    //fontFamily: fonts.primary,
    letterSpacing: 2,
    color: colors.ErrorTextColor,
  },
});

export default AppDownload;
