export function handleLogin(email, setEmailError, password, setPasswordError) {
  checkEmail(email, setEmailError);
  checkPassword(password, setPasswordError);
}

export function handleNewPassword({
  password,
  setPasswordError,
  confirmPassword,
  setConfirmPasswordError,
}) {
  checkPassword(password, setPasswordError);
  checkConfirmPassword(password, confirmPassword, setConfirmPasswordError);
}

export function handleSettings(
  type,
  newName,
  setNameError,
  oldPassword,
  setOldPasswordError,
  newPassword,
  setNewPasswordError,
  confirmPassword,
  setConfirmPasswordError,
  oneTimeKey,
  setOneTimeKeyError
) {
  switch (type) {
    case "NAME":
      checkName(newName, setNameError);
      break;
    case "PASSWORD":
      checkPassword(oldPassword, setOldPasswordError);
      checkPassword(newPassword, setNewPasswordError);
      checkConfirmPassword(
        newPassword,
        confirmPassword,
        setConfirmPasswordError
      );
      break;
    case "DELETE":
      checkKey(oneTimeKey, setOneTimeKeyError);
    default:
      break;
  }
}
export function checkEmail(email, setEmailError) {
  if (email.length < 6 || email == "")
    setEmailError("Email should be minimum 6 characters");
  else if (email.indexOf(" ") >= 0)
    setEmailError("Email cannot contain spaces");
  else setEmailError("");
}

export function checkName(name, setNameError) {
  if (name.length < 2) setNameError("Name should be minimum 2 characters");
  else setNameError("");
}

export function checkPassword(password, setPasswordError) {
  if (password.length < 10)
    setPasswordError("Password should be minimum 10 characters");
  else if (password.indexOf(" ") >= 0)
    setPasswordError("Password cannot contain spaces");
  else setPasswordError("");
}

export function checkConfirmPassword(
  password,
  confirmPassword,
  setConfirmPasswordError
) {
  if (confirmPassword != password)
    setConfirmPasswordError("Confirmed password and password are not the same");
  else setConfirmPasswordError("");
}

export function checkKey(password, setPasswordError) {
  if (password == "") setPasswordError("Wrong key");
  else setPasswordError("");
}

export function checkCmdParam(cmdParam, setCmdParamError) {
  if (cmdParam == "") setCmdParamError("param cannot be empty");
  else setCmdParamError("");
}

export function checkUrl(specificUrl, setSpecificUrlError) {
  if (specificUrl == "") setSpecificUrlError("Url cannot be empty");
  else setSpecificUrlError("");
}