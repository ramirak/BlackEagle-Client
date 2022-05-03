import { React } from "react";
import {
    Text,
    View,
    SafeAreaView,
} from "react-native";
import global from "../config/global";
import ParentMenu from "../components/ParentMenu";

const About = ({ navigation }) => {
    return (
        <SafeAreaView style={global.PageContainer}>
            <ParentMenu navigation={navigation} />
            <View style={global.RightContainer}>
                <View style={global.HeaderMenu}>
                    <Text style={global.HeaderText}>About</Text>
                </View>
                <View style={global.RightMenu}>
                    <View style={global.ListView}>
                        <Text>
                            Final Project - {'\n'}
                            Liron Eli Shabtai & Rami Rak, {'\n'}
                            Afeka College of Engineering.
                            {'\n'}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default About;
