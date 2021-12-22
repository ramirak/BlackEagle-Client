const RegisterNow = () => {
  fetch("http://localhost:8010/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: {
        uid: "ramirak111@gmail.com",
        password: {
          password: "123rrAvvads123@",
          hint: "nohintstoday",
        },
      },
      role: "PLAYER",
    }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("RESULTS HERE:", responseData);

      this.setState(
        {
          isLoading: false,
          dataSource: responseJson,
        },
        function () {}
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

export default RegisterNow;
