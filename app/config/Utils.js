import AsyncStorage from "@react-native-async-storage/async-storage";
import { addChild } from "../components/FetchRequest";

export function handleRefresh(setRefresh) {
  setRefresh(true);
}

export function removeNonAscii(decodedData) {
  return decodedData
    .replace(
      /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\[\]`~/\n]*/g,
      ""
    )
    .replace(/,/g, "\n");
}

export const getData = async (key, setEmail) => {
  try {
    const value = await AsyncStorage.getItem(key);
    setEmail(value);
    return value;
  } catch (e) {
    // error reading value
  }
};

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@email", value);
  } catch (e) { }
};

export function checkChildName(name, setName, setRefresh) {
  if (name != "") return addChild(name, setName, setRefresh);
  return alert("Name is required");
}

export function getJsonBodyByType(type, newName, oldPassword, newPassword) {
  let regName = null,
    regPassword = null,
    regOptionalPassword = null,
    regUid = null;
  if (type == "NAME") {
    regName = newName;
  } else if (type == "PASSWORD") {
    (regPassword = newPassword), (regOptionalPassword = oldPassword);
  } else if (type == "DEVICE_NAME") {
    regName = newName;
    regUid = oldPassword;
  }
  let jsonTemplate = {
    userId: {
      uid: regUid,
      password: {
        password: regPassword,
        optionalPassword: regOptionalPassword,
        creationTime: null,
        active: true,
      },
    },
    role: null,
    name: regName,
    deviceCount: null,
  };
  return jsonTemplate;
}

export function handlePreviousPage(page, setPage) {
  setPage(page - 1 < 0 ? 0 : page - 1);
}

export function handleNextPage(page, setPage, size, maxSize) {
  if (size > maxSize - 1) setPage(page + 1);
}
