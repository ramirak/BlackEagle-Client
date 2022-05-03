import { React } from "react";
import {
    Text,
    View,
    SafeAreaView,
} from "react-native";
import global from "../config/global";
import ParentMenu from "../components/ParentMenu";

const Help = ({ navigation }) => {
    return (
        <SafeAreaView style={global.PageContainer}>
            <ParentMenu navigation={navigation}/>
            <View style={global.RightContainer}>
                <View style={global.HeaderMenu}>
                    <Text style={global.HeaderText}>BlackEagle Q/A</Text>
                </View>
                <View style={global.RightMenu}>
                    <View style={global.ListView}>
                        <Text>
                            How to connect a new device?
                            {'\n'}
                            From the interface menu, enter a new device name and click 'Add device'.
                            A new popup will notify you for the creation of the device and you will be able to download the authentication file. Copy this file to the black eagle spyware app folder and start the program.
                            {'\n'}
                            How to request data from a device?
                            {'\n'}
                            From the interface menu, choose the child device you would like to control. Find the request you would like to send, E.g., Screenshots, Camera. Click on the "Add Request" button. You will be notified whether the request has been sent.
                            {'\n'}
                            How to filter network activity on a device?
                            {'\n'}
                            Click on filtering from the device control menu, click on "Add Request" button and choose which categories you would like to block. You may add additional custom sites of your choice. E.g., facebook.com. Click send and the chosen categories and sites should be blocked.
                            {'\n'}
                            How can I send remote commands to my devices?
                            {'\n'}
                            You may choose from the different commands presented at the CMD menu after pressing the "Add command request". Certain commands require additional parameters such as path variable.
                            {'\n'}
                            I would like to lock my kid's computer; how does it work?
                            {'\n'}
                            After sending a request for a lockdown from the device control menu, the device should get locked as soon as the remote device syncs with the server. A new password will be sent to the lockdown page.
                            {'\n'}
                            Can I get the history file from the devices??
                            {'\n'}
                            You can download the history files from the specified browsers in the History menu. To access them you will need to use a 3rd party application.
                            {'\n'}
                            I'm getting a message which states I have used all my account quota, what can I do?
                            {'\n'}
                            You can either delete old data from your account or upgrade your account to one of the options available right now.
                            {'\n'}
                            I want to stop the devices from collecting data but do not want to delete the service yet. How can I do so?
                            {'\n'}
                            At any time, you can suspend the service from the settings menu. The devices will stop the collection of data until reactivation.
                            {'\n'}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};


export default Help;
