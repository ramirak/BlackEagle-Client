import { removeNonAscii } from "../config/Utils";

export function getSettingsDetails(email, setDetails) {
  fetch(
    "https://localhost:8010/data/get/" + email + "/CONFIGURATION@" + email,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((responseJson) => {
      let detailsStr =
        "Registered Account: " +
        responseJson.dataAttributes.REGISTERED_ACCOUNT +
        "\n" +
        "Current Disk Quota: " +
        responseJson.dataAttributes.CURRENT_DISK_QUOTA +
        " / " +
        responseJson.dataAttributes.MAX_DISK_QUOTA +
        "\n" +
        "Current Number of Devices: " +
        responseJson.dataAttributes.CURRENT_NUM_DEVICES +
        " / " +
        responseJson.dataAttributes.MAX_ALLOWED_DEVICES;
      setDetails(removeNonAscii(detailsStr));
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

export function deleteUser(oldPassword, navigation) {
  fetch("https://localhost:8010/users/delete", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: oldPassword,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("The account has been deleted.");
        navigation.navigate("Homepage");
      } else {
        alert("Deletion failed.");
      }
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

export function updateChild(jsonBody) {
  fetch("https://localhost:8010/device/update", {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  })
    .then((response) => {
      if (response.ok) alert("The update was successful.");
      else {
        alert("The update failed.");
      }
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

export function updateUser(jsonBody, setModalVisible) {
  fetch("https://localhost:8010/users/update", {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonBody),
  })
    .then((response) => {
      if (response.ok) alert("The update was successful");
      else if (response.status == "406") {
        alert("Invalid new password");
        setModalVisible(true);
      } else if (response.status == "401") {
        alert("Invalid old password");
        setModalVisible(true);
      } else if (response.status == "409") {
        alert("The password has been used before");
        setModalVisible(true);
      }
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}