import { React } from "react";
import { Pressable } from "react-native";
import { Text, StyleSheet } from "react-native-web";
import { checkChildName } from "../config/Utils";
import global from "../config/global";
import colors from "../config/colors";

export function SmallNaviButton({ navigation, page, text, email }) {
  return (
    <Pressable
      style={global.SmallButton}
      onPress={() => navigation.navigate(page, { email: email })}
    >
      <Text style={global.SmallButtonText}>{text}</Text>
    </Pressable>
  );
}


export function AddChildButton({ name, setName, setRefresh }) {
  return (
    <Pressable
      style={global.SendButton}
      onPress={() => {
        checkChildName(name, setName, setRefresh);
      }}
    >
      <Text style={global.ButtonText}>Add Child</Text>
    </Pressable>
  );
}

export function GoBackButton({ navigation, uid, name }) {
  return (
    <Pressable
      style={styles.GoBackButton}
      onPress={() =>
        navigation.navigate("Control Options", { uid: uid, name: name })
      }
    >
      <Text style={global.ButtonText}>Go Back</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  GoBackButton: {
    height: 20,
    width: 100,
    borderRadius: 4,
    alignItems: "center",
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
});
