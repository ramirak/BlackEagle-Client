import { React, useState, useEffect } from "react";
import { Pressable, Text, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TextInput, StyleSheet } from "react-native-web";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import base64 from "react-native-base64";
import ParentMenu from "../components/ParentMenu";
import { handleRefresh, removeNonAscii } from "../config/Utils";
import { checkCmdParam } from "../components/Errors";
import {
  addRequest,
  deleteData,
  getSpecificData,
} from "../components/FetchRequest";
import { GoBackButton } from "../components/Buttons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

// Command and Lockdown requests page
const NotImmRequest = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfigVisible, setModalConfigVisible] = useState(false);
  const [cmdType, setCmpType] = useState("");
  const [cmdParam, setCmdParam] = useState("");
  const [cmdParamError, setCmdParamError] = useState("");
  const { uid } = route.params;
  const { name } = route.params;
  const { type } = route.params;

  useEffect(() => {
    if (!refresh) return;
    fetch("https://localhost:8010/data/getAll/" + uid + "/" + type, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
      });
    setRefresh(false);
  }, [refresh]); //, pageCurrent]);

  const setDataText = () => {
    let decodedData = base64.decode(specificData.toString());
    return (
      <ScrollView>
        <Text>{removeNonAscii(decodedData)}</Text>
      </ScrollView>
    );
  };

  const setAddRequestComponent = () => {
    switch (type) {
      case "COMMAND":
        return (
          <View>
            <View>
              <Picker
                style={global.TextInput}
                selectedValue={cmdType}
                onValueChange={(itemValue, itemIndex) => setCmpType(itemValue)}
              >
                <Picker.Item label="Show all processes" value="tasklist" />
                <Picker.Item label="Close a program" value="taskkill /IM" />
                <Picker.Item label="Show hidden files" value="dir /AH" />
                <Picker.Item label="Show folders and files" value="dir /ON" />
              </Picker>
            </View>
            <View>{getAdditionalParam(cmdType)}</View>
            <Text style={global.ErrorMsg}>{cmdParamError}</Text>
          </View>
        );
      default: //LOCKDOWN
        break;
    }
  };

  const checkRequestButton = () => {
    switch (type) {
      case "COMMAND":
        return (
          <Pressable
            onPress={() => setModalConfigVisible(true)}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>
              Add {type.toLowerCase()} request
            </Text>
          </Pressable>
        );
      default:
        return (
          <Pressable
            onPress={() => defineTypeAttributes()}
            style={styles.AddRequestButton}
          >
            <Text style={global.ButtonText}>
              Add {type.toLowerCase()} request
            </Text>
          </Pressable>
        );
    }
  };

  const defineTypeAttributes = () => {
    let dataAttr;
    if (type == "COMMAND") {
      dataAttr = {
        REQUEST_TYPE: type,
        COMMAND_TYPE: cmdType,
        COMMAND_PARAMETER: cmdParam,
      };
      checkCmdParam(cmdParam, setCmdParamError);
      addRequest(uid, dataAttr);
    } else {
      dataAttr = { REQUEST_TYPE: type };
      addRequest(uid, dataAttr);
    }
  };

  const getAdditionalParam = (cmdType) => {
    switch (cmdType) {
      case "taskkill /IM":
      case "dir /AH":
      case "dir /ON":
        return (
          <TextInput
            style={global.TextInputInModal}
            placeholder="Additional Param"
            placeholderTextColor={colors.primary}
            onChangeText={(cmdParam) => setCmdParam(cmdParam)}
          />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={global.PageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.RightContainer}>
        <View>
          <GoBackButton navigation={navigation} uid={uid} name={name} />
        </View>
        <View style={global.HeaderMenu}>
          <Text style={global.HeaderText}>
            {name + " - " + type.toLowerCase()}
          </Text>
        </View>
        <View style={global.RightMenu}>
          <View style={global.ArrowView}>
            <Pressable
              style={global.ArrowButton}
              //onPress={() => handlePreviousPage()}
            >
              <MaterialIcons
                name="delete-sweep"
                size={sizes.iconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              //onPress={() => handlePreviousPage()}
            >
              <MaterialIcons
                name="navigate-before"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              //onPress={() => handleNextPage()}
            >
              <MaterialIcons
                name="navigate-next"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              onPress={() => handleRefresh(setRefresh)}
            >
              <FontAwesome
                style={global.icon}
                name="refresh"
                size={sizes.refreshIconSize}
                color={colors.primary}
              />
            </Pressable>
          </View>
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={data}
            renderItem={({ item }) => (
              <Pressable
                style={global.ButtonList}
                onPress={() => {
                  setModalVisible(true),
                    getSpecificData(uid, item.dataId, setSpecificData);
                }}
              >
                <Text style={global.ListItemText}>
                  {item.dataType} : {item.createdTimestamp} : {item.dataId}
                </Text>
                <Pressable
                  style={global.IconButton}
                  onPress={() => {
                    deleteData(item.dataId, setRefresh);
                  }}
                >
                  <FontAwesome
                    name="trash-o"
                    size={sizes.iconSize}
                    color={colors.primary}
                  />
                </Pressable>
              </Pressable>
            )}
          />
          <Modal /*Modal for showing a specific data*/
            style={global.ModalContainer}
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={global.ModalView}>
              <View style={global.ModalContainer}>
                <View style={global.TopModalView}>{setDataText()}</View>
                <View style={global.BottomModalView}>
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
          <Modal /* Modal for COMMAND components */
            style={global.ModalConfigContainer}
            animationType="fade"
            transparent={true}
            visible={modalConfigVisible}
            onRequestClose={() => {
              setModalConfigVisible(!modalConfigVisible);
            }}
          >
            <View style={global.ModalView}>
              <View style={global.ModalConfigContainer}>
                <View style={global.TopModalView}>
                  {setAddRequestComponent()}
                </View>
                <View style={global.BottomModalView}>
                  <Pressable
                    onPress={() => {
                      defineTypeAttributes();
                    }}
                    style={global.CloseButton}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.CloseButton}
                    onPress={() => setModalConfigVisible(!modalConfigVisible)}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          {checkRequestButton()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AddRequestButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderColor: colors.borderRightColor,
    backgroundColor: colors.primary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: colors.secondary,
    margin: 5,
    paddingLeft: 10,
  },
});

export default NotImmRequest;