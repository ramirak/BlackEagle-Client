import { React, useState, useEffect } from "react";
import { Pressable, Text, Modal, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TextInput, StyleSheet } from "react-native-web";
import Checkbox from "expo-checkbox";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ParentMenu from "../components/ParentMenu";
import { handleRefresh } from "../config/Utils";
import { checkUrl } from "../components/Errors";
import { configUpdate } from "../components/FetchRequest";
import { GoBackButton } from "../components/Buttons";
import global from "../config/global";
import colors from "../config/colors";
import sizes from "../config/sizes";

const DeviceConfiguration = ({ route, navigation }) => {
  const [data, setData] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [fakenews, setFakenews] = useState(false);
  const [gambling, setGambling] = useState(false);
  const [porn, setPorn] = useState(false);
  const [social, setSocial] = useState(false);
  const [specificUrl, setSpecificUrl] = useState("");
  const [additionalSitesOP, setAdditionalSitesOP] = useState("Add");
  const [specificUrlError, setSpecificUrlError] = useState("");
  const { uid } = route.params;
  const { name } = route.params;
  const { type } = route.params;

  useEffect(() => {
    if (!refresh) return;
    fetch("https://localhost:8010/data/get/" + uid + "/" + type + "@" + uid, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setFakenews(responseJson.dataAttributes.FAKENEWS === "true");
        setPorn(responseJson.dataAttributes.PORN === "true");
        setSocial(responseJson.dataAttributes.SOCIAL === "true");
        setGambling(responseJson.dataAttributes.GAMBLING === "true");

        setData(responseJson.dataAttributes);
      });
    setRefresh(false);
  }, [refresh]); //, pageCurrent]);

  const setAddRequestComponent = () => {
    return (
      <ScrollView>
        <View style={styles.CheckboxContainer}>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={styles.Checkbox}
              value={fakenews}
              onValueChange={setFakenews}
            />
            <Text style={sizes.FilterTextSize}>Fakenews</Text>
          </View>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={styles.Checkbox}
              value={gambling}
              onValueChange={setGambling}
            />
            <Text style={sizes.FilterTextSize}>Gambling</Text>
          </View>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={styles.Checkbox}
              value={porn}
              onValueChange={setPorn}
            />
            <Text style={sizes.FilterTextSize}>Porn</Text>
          </View>
          <View style={styles.CheckboxSection}>
            <Checkbox
              style={styles.Checkbox}
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
          <Text style={global.ErrorMsg}>{specificUrlError}</Text>
        </View>
        <View>
          <Text>{JSON.stringify(data.ADDITIONAL_SITES)}</Text>
        </View>
      </ScrollView>
    );
  };

  const defineConfigAttributes = () => {
    let dataAttr = {
      FAKENEWS: fakenews,
      GAMBLING: gambling,
      PORN: porn,
      SOCIAL: social,
      ADDITIONAL_SITES: specificUrl,
      ADDITIONAL_SITES_OPERATION: additionalSitesOP,
    };
    checkUrl(specificUrl, setSpecificUrlError);
    configUpdate(uid, dataAttr);
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
          {setAddRequestComponent()}
          <Pressable
            style={styles.AddRequestButton}
            onPress={() => defineConfigAttributes()}
          >
            <Text style={global.ButtonText}>
              Add {type.toLowerCase()} request
            </Text>
          </Pressable>
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
  CheckboxContainer: {
    flex: 1,
  },
  CheckboxSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  Checkbox: {
    margin: 8,
  },
});

export default DeviceConfiguration;
