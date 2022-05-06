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
      console.log("error: " + error);
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
      else throw new Error(response.status);
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

export function addChild(childName, setRefresh) {
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
      if (response.status == "507") {
        alert("You can only create up to 5 devices");
      } else if (response.status == "400") {
        alert("Name is required");
      } else {
        alert(
          "Your device authentication details is being downloaded.\nPlease keep it in a secure loaction!"
        );
      }
      return response.json();
    })
    .then((responseJson) => {
      let deviceLoginDetails = JSON.stringify({
        uid: responseJson.userId.uid,
        password: responseJson.userId.passwordBoundary.password,
      });
      fileDownload(deviceLoginDetails, "auth.json");
    })
    .then(() => setRefresh(true))
    .catch((error) => {
      console.log("error: " + error);
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
      console.log("error: " + error);
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
      if (response.ok) {
        alert("The request has been sent.");
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
      console.log("error: " + error);
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
      console.log("error: " + error);
    });
}

export function addConfigurationRequest(uid, dataAttr) {
  fetch("https://localhost:8010/data/update/" + uid, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dataType: "CONFIGURATION",
      dataAttributes: dataAttr,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("The request has been sent.");
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
}

export function deleteUrl(
  dataId,
  type,
  fakenews,
  gambling,
  porn,
  social,
  specificUrl,
  additionalSitesOP
) {
  let dataAttr = {
    FAKENEWS: fakenews,
    GAMBLING: gambling,
    PORN: porn,
    SOCIAL: social,
    ADDITIONAL_SITES: specificUrl,
    ADDITIONAL_SITES_OPERATION: additionalSitesOP,
  };
  fetch("https://localhost:8010/data/update", {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      DATAID: "CONFIGURATION@" + dataId,
      DATATYPE: type,
      dataAttributes: dataAttr,
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
