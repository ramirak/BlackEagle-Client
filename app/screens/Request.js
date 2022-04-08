import { React, useState, useEffect } from "react";
import { Pressable, Text, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TextInput } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
import base64 from "react-native-base64";
import ParentMenu from "../components/ParentMenu";
import PagingArrows from "../components/PagingArrows";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Request = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [pageCurrent, setpageCurrent] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfigVisible, setModalConfigVisible] = useState(false);
  const [cmdType, setCmpType] = useState([]);
  const [cmdParam, setCmdParam] = useState([]);
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
  }, [refresh]);

  const checkConfig = () => {
    switch (type) {
      case "COMMAND":
      case "FILTERS":
        setModalConfigVisible(true);
        break;
      default:
        addRequest();
        break;
    }
  };

  const addRequest = () => {
    let dataAttr;
    if (type == "COMMAND") {
      dataAttr = {
        REQUEST_TYPE: type,
        COMMAND_TYPE: cmdType,
        COMMAND_PARAMETER: cmdParam,
      };
    } else {
      dataAttr = { REQUEST_TYPE: type };
    }
    fetch("https://localhost:8010/data/add/" + uid, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dataType: "REQUEST",
        dataAttributes: dataAttr,
      }),
    })
    .then((response) => {
      if (response.ok) {
        alert("The request has been sent.");
      }else{
        alert(
          "There is an already pending request."
        )
      }
      return response.json();
    })
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const getSpecificData = (dataId) => {
    fetch("https://localhost:8010/data/get/" + uid + "/" + dataId, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setSpecificData(responseJson.dataAttributes.DATA);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const deleteData = (dataId) => {
    fetch("https://localhost:8010/data/delete/" + uid + "/" + dataId, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => setRefresh(true))
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  const setComponentType = () => {
    switch (type) {
      case "SCREENSHOT": //bmp
        return (
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
            source={{ uri: "data:image/bmp;base64," + specificData }}
          />
        );
      case "CAMERA": //png
        return (
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
            source={{ uri: "data:image/png;base64," + specificData }}
          />
        );
      case "AUDIO": //wav
        break;
      default: {
        //text
        let decodedData = base64.decode(specificData.toString());
        console.log(decodedData);
        return <Text>{removeNonAscii(decodedData)}</Text>;
      }
    }
  };

  const removeNonAscii = (decodedData) => {
    return decodedData
      .replace(
        /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\[\]`~]*/g,
        ""
      )
      .replace(/,/g, "\n");
  };

  const setAddRequestComponent = () => {
    switch (type) {
      case "COMMAND":
        return (
          <View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="Command"
                placeholderTextColor={colors.primary}
                onChangeText={(cmdType) => setCmpType(cmdType)}
              />
            </View>
            <View>
              <TextInput
                style={global.TextInput}
                placeholder="Additional Param"
                placeholderTextColor={colors.primary}
                onChangeText={(cmdParam) => setCmdParam(cmdParam)}
              />
            </View>
          </View>
        );
      case "FILTERS":
        break;

      default:
        break;
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
  };

  /*
  const handlePreviousPage = () => {
    console.log("previous page clicked", pageCurrent);
    // Do this so your page can't go negative
    setpageCurrent(pageCurrent - 1 < 1 ? 1 : pageCurrent - 1);
  };

  const handleNextPage = () => {
    console.log("next page clicked", pageCurrent);
    setpageCurrent(pageCurrent + 1);
  };
  */

  return (
    <SafeAreaView style={global.pageContainer}>
      <ParentMenu navigation={navigation} />
      <View style={global.rightContainer}>
        <View>
          <Pressable
            style={global.refreshButton}
            onPress={() => handleRefresh()}
          >
            <FontAwesome
              style={global.icon}
              name="refresh"
              size={sizes.refreshIconSize}
              color={colors.primary}
            />
          </Pressable>
        </View>
        <View style={global.headerMenu}>
          <Text style={global.headerText}>{name + " - " + type.toLowerCase()}</Text>
        </View>
        <View style={global.rightMenu}>
          <PagingArrows />
          <FlatList
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            data={data}
            renderItem={({ item }) => (
              <Pressable
                style={global.ButtonList}
                onPress={() => {
                  setModalVisible(true), getSpecificData(item.dataId);
                }}
              >
                <Text style={global.ButtonText}>
                  {item.dataType} : {item.createdTimestamp} : {item.dataId}
                </Text>
                <Pressable
                  style={global.IconButton}
                  onPress={() => deleteData(item.dataId)}
                >
                  <FontAwesome
                    name="trash-o"
                    size={sizes.iconSize}
                    color={colors.secondary}
                  />
                </Pressable>
              </Pressable>
            )}
          />
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
                <View style={global.TopModalView}>{setComponentType()}</View>
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
          <Modal
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
                      {
                        addRequest(),
                          setModalConfigVisible(!modalConfigVisible);
                      }
                    }}
                    style={global.buttonClose}
                  >
                    <Text style={global.ButtonText}>Send</Text>
                  </Pressable>
                  <Pressable
                    style={global.buttonClose}
                    onPress={() => setModalConfigVisible(!modalConfigVisible)}
                  >
                    <Text style={global.ButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            onPress={() => {
              checkConfig();
            }}
            style={global.AddRequestButton}
          >
            <Text style={global.ButtonText}>Add Request</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Request;
