import AsyncStorage from "@react-native-async-storage/async-storage";

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
}

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@email", value);
  } catch (e) { }
}

export function getJsonBodyByType(type, newName, newPassword, email) {
  let regName = null,
    regPassword = null,
    regOptionalPassword = null;
  if (type == "NAME") {
    regName = newName;
  } else if (type == "PASSWORD") {
    (regPassword = newPassword), (regOptionalPassword = newPassword);
  }
  let jsonTemplate = {
    userId: {
      uid: email,
      name: regName,
      password: {
        password: regPassword,
        optionalPassword: regOptionalPassword,
        creationTime: null,
        active: null,
      },
    },
    role: null,
    active: null,
    deviceCount: null,
  };
  return jsonTemplate;
}

export function handlePreviousPage(page, setPage) {
  setPage(page - 1 < 0 ? 0 : page - 1);
}

export function handleNextPage(page, setPage, size, maxSize) {
  if (parseInt(size / maxSize, 10) > page)
    setPage(page + 1);
}
