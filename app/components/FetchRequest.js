import fileDownload from "js-file-download";

export function checkSession(navigation) {
  fetch("https://localhost:8010/users/sessionCheck", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        navigation.navigate("Interface");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function registerNow(
  email,
  name,
  password,
  navigation
) {
  fetch("https://localhost:8010/users/register", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: {
        uid: email,
        password: {
          password: password,
        },
      },
      role: "PLAYER",
      name: name,
    }),
  })
    .then((response) => {
      if (response.status == "409") alert("The email is already in use");
      else if (response.status == "406")
        alert("Invalid email format or password");
      else if (response.ok) navigation.navigate("Login");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function LoginNow(email, password, navigation) {
  fetch("https://localhost:8010/login", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) navigation.navigate("Second Login", { email: email });
      else if (response.status == "403")
        alert("Failed to authenticate");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getAccount(setParentName) {
  fetch("https://localhost:8010/users/getAccount", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setParentName(responseJson.name);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function addChild(childName, setName, setRefresh) {
  fetch("https://localhost:8010/device/add", {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: childName,
    }),
  })
    .then((response) => {
      if (response.status == "507")
        alert("You can only create up to 5 devices");
      else
        alert(
          "Your device authentication details is being downloaded.\nPlease keep it in a secure loaction!"
        );
      return response.json();
    })
    .then((responseJson) => {
      let deviceLoginDetails = JSON.stringify({
        uid: responseJson.userId.uid,
        password: responseJson.userId.passwordBoundary.password,
      });
      fileDownload(deviceLoginDetails, "auth.json");
    })
    .then(() => {setRefresh(true), setName("")})
    .catch((error) => {
      console.log(error);
    });
}

export function deleteChild(id, setRefresh) {
  fetch("https://localhost:8010/device/delete/" + id, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => setRefresh(true))
    .catch((error) => {
      console.log(error);
    });
}

export function addRequest(uid, dataAttr) {
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
      if (response.ok) alert("The request has been sent.");
      else if (response.status == "409")
        alert("An early request has already been sent");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getSpecificData(uid, dataId, setSpecificData) {
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
      console.log(error);
    });
}

export function deleteData(dataId, setRefresh) {
  fetch("https://localhost:8010/data/delete/" + dataId, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => setRefresh(true))
    .catch((error) => {
      console.log(error);
    });
}

export function deleteAllData(uid, type, setRefresh) {
  fetch("https://localhost:8010/data/deleteAll/" + uid + "/" + type, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => setRefresh(true))
    .catch((error) => {
      console.log(error);
    });
}

export function configUpdate(uid, dataAttr, setRefresh) {
  fetch("https://localhost:8010/data/update", {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dataId: "CONFIGURATION@" + uid,
      dataType: "CONFIGURATION",
      dataAttributes: dataAttr,
    }),
  })
    .then((response) => {
      if (response.ok) alert("The update was successful.");
      else alert("The update failed.");
    })
    .then(() => setRefresh(true))
    .catch((error) => {
      console.log(error);
    });
}
