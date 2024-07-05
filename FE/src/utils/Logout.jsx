function Logout(userRole) {
    localStorage.removeItem("userInfo");
  if (userRole == "Customer") {
    return "/login";
  } else {
    return "/admin/login";
  }
}

export default Logout;
