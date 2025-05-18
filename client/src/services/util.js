function getUserDetails() {
  const json = localStorage.getItem("asp_user_details");
  if (!json) {
    return {};
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    return {};
  }
}

function setUserDetails(obj) {
  localStorage.setItem("asp_user_details", JSON.stringify(obj));
}

export { getUserDetails, setUserDetails };
