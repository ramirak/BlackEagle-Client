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
      setDetails(removeNonAscii(JSON.stringify(responseJson.dataAttributes)));
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

export function deleteUser(oneTimeKey) {
  fetch("https://localhost:8010/users/delete/" + oneTimeKey, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("The account has been deleted.");
      } else {
        alert("Deletion failed.");
      }
      return response.json(type);
    })
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

export function updateUser(jsonBody) {
  fetch("https://localhost:8010/users/update", {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonBody,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("The update was successful.");
      } else {
        alert("The update failed.");
      }
      return response.json(type);
    })
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}