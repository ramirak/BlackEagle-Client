import { React, useState } from "react";
import { Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Text } from "react-native-web";
import { AntDesign, Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={global.pageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.rightContainer}>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>Account Settings</Text>
        </View>
        <View style={global.rightMenu}>
          <View style={styles.MenuRow}>
          <Pressable
              style={styles.Button}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons name="rename-box" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Update Name</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons name="form-textbox-password" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Update Password</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="md-notifications-circle" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Notification Settings</Text>
            </Pressable>
          </View>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="security" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Security</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => setModalVisible(true)}
            >
              <Entypo name="text-document" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Logs</Text>
            </Pressable>
            <Pressable
              style={styles.Button}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons name="account-cancel-outline" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Suspend Account</Text>
            </Pressable>
          </View>
          <View style={styles.MenuRow}>
            <Pressable
              style={styles.Button}
              onPress={() => setModalVisible(true)}
            >
              <AntDesign name="deleteuser" size={sizes.iconSize} color="white" />
              <Text style={styles.ButtonText}>Delete Account</Text>
            </Pressable>
          </View>
          <Modal
            style={global.ModalContainer}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalContainer}>
                <View style={global.TopModalView}></View>
                <View style={global.BottomModalView}>
                  <Pressable
                    style={global.buttonClose}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MenuRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    height: 100,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    margin: 5,
    backgroundColor: colors.primary,
  },
  ButtonText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    textAlign: "center"
  },
  HeaderText: {
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.5,
    color: colors.primary,
  },
});


export default Settings;
