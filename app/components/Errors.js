export function handleNewPassword({
  password,
  setPasswordError,
  confirmPassword,
  setConfirmPasswordError,
}) {
  if (
    checkPassword(password, setPasswordError) &&
    checkConfirmPassword(password, confirmPassword, setConfirmPasswordError)
  )
    return true;
}

export function checkEmail(email, setEmailError) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (email.length === "") {
    setEmailError("email address must be enter");
    return false;
  } else if (reg.test(email) === false) {
    setEmailError("enter valid email address");
    return false;
  } else if (reg.test(email) === true) {
    setEmailError("");
    return true;
  }
}

export function checkName(name, setNameError) {
  let reg = /^[a-zA-Z]+$/;

  if (name.length < 2) {
    setNameError("Name should be minimum 2 characters");
    return false;
  } else if (reg.test(name) === false) {
    setNameError("enter valid email address - letters only");
    return false;
  } else if (reg.test(name) === true) {
    setNameError("");
    return true;
  }
}

export function checkPassword(password, setPasswordError) {
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;

  if (password.length < 10 || password.length > 16) {
    setPasswordError(
      "Password should be minimum 10 characters and maximum 16 characters"
    );
    return false;
  } else if (password.indexOf(" ") >= 0) {
    setPasswordError("Password cannot contain spaces");
    return false;
  } else if (uppercaseRegExp.test(password)) {
    setPasswordError("Password must cointain at least 1 uppercase letter ");
    return false;
  } else if (lowercaseRegExp.test(password)) {
    setPasswordError("Password must cointain at least 1 lowercase letter ");
    return false;
  } else if (digitsRegExp.test(password)) {
    setPasswordError("Password must cointain at least 1 digit");
    return false;
  } else if (specialCharRegExp.test(password)) {
    setPasswordError("Password must cointain at least 1 special letter");
    return false;
  } else {
    setPasswordError("");
    return true;
  }
}

export function checkConfirmPassword(
  password,
  confirmPassword,
  setConfirmPasswordError
) {
  if (confirmPassword != password) {
    setConfirmPasswordError("Confirmed password and password are not the same");
    return false;
  } else {
    setConfirmPasswordError("");
    return true;
  }
}

export function checkKey(password, setPasswordError) {
  if (password == "") {
    setPasswordError("Key cannot be empty");
    return false;
  } else {
    setPasswordError("");
    return true;
  }
}

export function checkCmdParam(cmdParam, setCmdParamError) {
  if (cmdParam == "") {
    setCmdParamError("Param cannot be empty");
    return false;
  } else {
    setCmdParamError("");
    return true;
  }
}

export function checkUrl(specificUrl, setSpecificUrlError) {
  if (specificUrl == "") {
    setSpecificUrlError("Url cannot be empty");
    return false;
  } else {
    setSpecificUrlError("");
    return true;
  }
}
