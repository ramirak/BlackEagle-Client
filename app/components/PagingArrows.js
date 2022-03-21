import { React } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";
import global from "../config/global";
import sizes from "../config/sizes";
import colors from "../config/colors";

const PagingArrows = () => {
  return (
    <SafeAreaView>
      <View style={global.ArrowView}>
      <Pressable
              style={global.ArrowButton}
              onPress={() => navigation.navigate("Homepage")}
            >
              <MaterialIcons
                name="navigate-before"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
            <Pressable
              style={global.ArrowButton}
              onPress={() => navigation.navigate("Homepage")}
            >
              <MaterialIcons
                name="navigate-next"
                size={sizes.PagingArrowIconSize}
                color={colors.primary}
              />
            </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default PagingArrows;
