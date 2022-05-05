import { React } from "react";
import {
    Text,
    View,
    SafeAreaView,
} from "react-native";
import global from "../config/global";
import ParentMenu from "../components/ParentMenu";
import { ScrollView, StyleSheet, Pressable } from "react-native-web";
import { AntDesign } from '@expo/vector-icons';
import colors from "../config/colors";
import fonts from "../config/fonts";
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
                        <Text style={styles.AccountTypeText}>{"\n"}BlackEagle Spyware{"\n"}</Text>
                        <AntDesign name="windows" size={40} color="#00A4EF" />
                        <Text style={styles.AccountsText}>
                        {"\n"}32/64bits OS{"\n"}
                        </Text>
                        <Pressable><Text style={styles.PurchaseText}>Download Now{'\n'}</Text><AntDesign name="download" size={30} color="black" /></Pressable>
                        <Text>{"\n"}{"\n"}</Text>
                        <AntDesign name="android1" size={40} color="#3DDC84" />
                        <Text style={styles.AccountsText}>
                        {"\n"}Google Play{"\n"}
                        </Text>
                        <Pressable><Text style={styles.PurchaseText}>Download Now{'\n'}</Text><AntDesign name="download" size={30} color="black" /></Pressable>
                        <Text>{"\n"}{"\n"}</Text>
                        <AntDesign name="apple1" size={40} color="black" />
                        <Text style={styles.AccountsText}>
                        {"\n"}App Store{"\n"}
                        </Text>
                        <Pressable><Text style={styles.PurchaseText}>Download Now{'\n'}</Text><AntDesign name="download" size={30} color="black" /></Pressable>

                        

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    AccountsView: {
        flex: 1,
        textAlign: "center"
    },
    AccountTypeText: {
        fontSize: 20,
        fontWeight: 800,
        fontFamily: fonts.primary,
        fontStyle:"italic",
        letterSpacing: 3,
    },
    AccountsText: {
        fontSize: 16,
        fontWeight: 400,
        fontFamily: fonts.primary,
        letterSpacing: 2,
    },
    PurchaseText: {
        fontSize: 17,
        fontWeight: "bold",
        fontFamily: fonts.primary,
        letterSpacing: 2,
        color: colors.ErrorTextColor,
    }
});

export default AppDownload;
