import { React } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native-web";
import global from "../config/global";
import colors from "../config/colors";
import ParentMenu from "../components/ParentMenu";
import { ScrollView } from "react-native-web";
const Help = ({ navigation }) => {
  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>BlackEagle Q/A</Text>
        </View>
        <View style={global.RightMenu}>
          <ScrollView style={global.TextView}>
            <Text>
              <Text style={styles.HelpTextHeader}>How to connect a new device?</Text>
              {"\n"}
              From the interface menu, enter a new device name and click 'Add
              device'. A new popup will notify you for the creation of the
              device and you will be able to download the authentication file.
              Copy this file to the black eagle spyware app folder and start the
              program.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>How to request data from a device?</Text>
              {"\n"}
              From the interface menu, choose the child device you would like to
              control. Find the request you would like to send, E.g.,
              Screenshots, Camera. Click on the "Add Request" button. You will
              be notified whether the request has been sent.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>Should I worry about the way my data stays on the server?</Text>
              {"\n"}
              All device related data, is encrypted with our AES-256 key and stays that way up until the monitoring user requests to view it.{"\n"}
              We also do not keep any user related data after the user request to delete his account.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>How about user privacy, do you collect any data about the users of this service?</Text>
              {"\n"}
              We do not collect any data which is not needed in order to provide our services to our users.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>How to filter network activity on a device?</Text>
              {"\n"}
              Click on filtering from the device control menu, click on "Add
              Request" button and choose which categories you would like to
              block. You may add additional custom sites of your choice. E.g.,
              facebook.com. Click send and the chosen categories and sites
              should be blocked.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>How can I send remote commands to my devices?</Text>
              {"\n"}
              You may choose from the different commands presented at the CMD
              menu after pressing the "Add command request". Certain commands
              require additional parameters such as path variable.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>I would like to lock my kid's computer; how does it work?</Text>
              {"\n"}
              After sending a request for a lockdown from the device control
              menu, the device should get locked as soon as the remote device
              syncs with the server. A new password will be sent to the lockdown
              page.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>Can I get the history file from the devices?</Text>
              {"\n"}
              You can download the history files from the specified browsers in
              the History menu. To access them you will need to use a 3rd party
              application.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>I'm getting a message which states I have used all my account
                quota, what can I do?</Text>
              {"\n"}
              You can either delete old data from your account or upgrade your
              account to one of the options available right now.
              {"\n\n"}
              <Text style={styles.HelpTextHeader}>I want to stop the devices from collecting data but do not
                want to delete the service yet. How can I do so?</Text>
              {"\n"}
              At any time, you can suspend the service from the settings menu.
              The devices will stop the collection of data until reactivation.
              {"\n\n"}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HelpTextHeader: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.ErrorTextColor,
  },
});

export default Help;
