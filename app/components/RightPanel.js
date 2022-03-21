import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-web";
import { FontAwesome } from "@expo/vector-icons";
import global from "../config/global";
import sizes from "../config/sizes";
import colors from "../config/colors";

const RightPanel = () => {
  return (
    <SafeAreaView>
      <View>
        <Pressable
          style={global.refreshButton}
          onPress={() => navigation.navigate("Homepage")}
        >
          <FontAwesome style={global.icon} name="refresh" size={sizes.refreshIconSize} color={colors.primary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RightPanel;
