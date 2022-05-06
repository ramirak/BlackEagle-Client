import { React } from "react";
import { Text, View, SafeAreaView } from "react-native";
import global from "../config/global";
import ParentMenu from "../components/ParentMenu";
import { ScrollView, StyleSheet, Pressable } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import sizes from "../config/sizes";
//import fonts from "../config/fonts";

const Upgrade = ({ navigation }) => {
  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>Upgrade Account</Text>
        </View>
        <View style={global.RightMenu}>
          <ScrollView style={styles.AccountsView}>
            <AntDesign name="check" size={sizes.iconSize} color={colors.CurrAccountTypeIconColor} />
            <Text style={styles.AccountTypeText}>Current: Free Account</Text>
            <Text style={styles.AccountsText}>
              Max disk quota: 500MB{"\n"}
              Max number of devices: 5{"\n"}
              No tech support{"\n"}
              Price: Free Forever{"\n"}
            </Text>
            <Text style={styles.AccountTypeText}>
              {"\n"}Premium Account:{"\n"}
            </Text>
            <Text style={styles.AccountsText}>
              Max disk quota: 1000MB{"\n"}
              Max number of devices: 7{"\n"}
              24/7 Tech support{"\n"}
              Price: 19.90$/Year{"\n"}
              Auto Renewal{"\n"}
            </Text>
            <Pressable>
              <Text style={styles.PurchaseText}>Purchase Now{"\n"}</Text>
              <AntDesign name="shoppingcart" size={sizes.iconSize} color={colors.AccountTypeIconColor} />
            </Pressable>
            <Text style={styles.AccountTypeText}>{"\n"}VIP Account:</Text>
            <Text style={styles.AccountsText}>
              Max disk quota: 2000MB{"\n"}
              Max number of devices: 10{"\n"}
              24/7 Tech support{"\n"}
              Price: 29.90$/Year{"\n"}
              Auto Renewal{"\n"}
            </Text>
            <Pressable>
              <Text style={styles.PurchaseText}>Purchase Now{"\n"}</Text>
              <AntDesign name="shoppingcart" size={sizes.iconSize} color={colors.AccountTypeIconColor} />
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
    fontSize: 17,
    fontWeight: 800,
    //fontFamily: fonts.primary,
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

export default Upgrade;
