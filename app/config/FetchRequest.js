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

export function deleteUrl(dataId, type, fakenews, gambling, porn, social, specificUrl, additionalSitesOP) {
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
      dataAttributes: dataAttr
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
};