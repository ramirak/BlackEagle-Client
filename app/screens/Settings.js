import { React, useState } from "react";
import { Pressable, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet } from "react-native-web";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import {
  getSettingsDetails,
  deleteUser,
  updateUser,
} from "../components/FetchSettings";
import { getData, getJsonBodyByType } from "../config/Utils";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [type, setType] = useState("");
  const [newName, setNewName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");

  const viewDetails = (type) => {
    getData("@email", setEmail);
    if (type == "DETAILS") return <Text>{details}</Text>;
  };

  const settingsComponent = (type) => {
    getData("@email", setEmail);
    switch (type) {
      case "NAME":
        return (
          <View>
            <View>
              <TextInput
                style={global.TextInputSettings}
                placeholder="New name"
                placeholderTextColor={colors.primary}
                onChangeText={(newName) => setNewName(newName)}
              />
            </View>
          </View>
        );
      case "PASSWORD":
        return (
          <View>
            <View style={styles.TextInputView}>
              <TextInput
                style={global.TextInputSettings}
                placeholder="Old password"
                secureTextEntry={true}
                placeholderTextColor={colors.primary}
                onChangeText={(oldPassword) => setOldPassword(oldPassword)}
              />
            </View>
            <View style={styles.TextInputView}>
              <TextInput
                style={global.TextInputSettings}
                placeholder="New password"
                secureTextEntry={true}
                placeholderTextColor={colors.primary}
                onChangeText={(newPassword) => setNewPassword(newPassword)}
              />
            </View>
            <View style={styles.TextInputView}>
              <TextInput
                style={global.TextInputSettings}
                placeholder="Confirm new password"
                secureTextEntry={true}
                placeholderTextColor={colors.primary}
                onChangeText={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
              />
            </View>
          </View>
        );
      case "DELETE":
        return (
          <View>
            <View style={styles.InsideModalView}>
              <Text style={styles.TextInfo}>
                Enter password to delete your account
              </Text>
            </View>
            <View>
              <TextInput
                style={global.TextInputSettings}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={colors.primary}
                onChangeText={(oldPassword) => setOldPassword(oldPassword)}
              />
            </View>
          </View>
        );
      default: {
        break;
      }
    }
  };

  const settingsRequests = () => {
    switch (type) {
      case "DELETE":
        return deleteUser(oldPassword, navigation);
      default:
        let jsonBody = getJsonBodyByType(
          type,
          newName,
          oldPassword,
          newPassword
        );
        if (type == "NAME" && jsonBody.name != "") {
          setModalVisible(!modalVisible);
          return updateUser(jsonBody, setModalVisible);
        } else if (
          type == "PASSWORD" &&
          oldPassword != "" &&
          newPassword != "" &&
          newPassword == confirmPassword
        ) {
          return updateUser(jsonBody, setModalVisible);
        } else
          alert("All fields are required and password should be confirmed");
    }
  };

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>Account Settings</Text>
        </View>
        <View style={global.RightMenu}>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() => {
                setModalVisible(true), setType("NAME");
              }}
            >
              <MaterialCommunityIcons
                name="rename-box"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Update Name</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() => {
                setModalVisible(true), setType("PASSWORD");
              }}
            >
              <MaterialCommunityIcons
                name="form-textbox-password"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Update Password</Text>
            </Pressable>
          </View>
          <View style={global.MenuRow}>
            <Pressable
              style={global.MenuButton}
              onPress={() => {
                setDetailsModalVisible(true),
                  setType("DETAILS"),
                  getSettingsDetails(email, setDetails);
              }}
            >
              <MaterialCommunityIcons
                name="account-details"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Account Details</Text>
            </Pressable>
            <Pressable
              style={global.MenuButton}
              onPress={() => {
                setModalVisible(true), setType("DELETE");
              }}
            >
              <AntDesign
                name="deleteuser"
                size={sizes.iconSize}
                color={colors.primary}
              />
              <Text style={global.MenuButtonText}>Delete Account</Text>
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
              <View style={global.ModalSettingsContainer}>
                <View style={global.TopModalSettingsView}>
                  {settingsComponent(type)}
                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      settingsRequests();
                    }}
                    style={global.CloseButton}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal //Details Modal
            style={global.ModalContainer}
            animationType="fade"
            transparent={true}
            visible={detailsModalVisible}
            onRequestClose={() => {
              setDetailsModalVisible(!detailsModalVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalSettingsContainer}>
                <View style={global.TopModalSettingsView}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    {viewDetails(type)}
                  </Text>
                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setDetailsModalVisible(!detailsModalVisible)}
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
  TextInfo: {
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 0.5,
    fontWeight: "bold",
    padding: 5,
  },
  InsideModalView: {
    alignItems: "center",
    justifyContent: "center",
  },
  SettingButton: {
    height: 40,
    width: 100,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  TextInputView: {
    padding: 2,
  },
});

export default Settings;
