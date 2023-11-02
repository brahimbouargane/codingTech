import { toast } from "react-toastify";

const API_URL = "http://localhost:7777/";
//const API_URL = "http://192.168.11.137:7777/";
// const API_URL = "https://dummyjson.com/auth/";


const login = async (username, password) => {
  try {
    const response = await fetch(API_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await response.json();
    if (data.jwt) {
      localStorage.setItem('user', JSON.stringify(data.userDetails));
      localStorage.setItem('token', data.jwt);
      toast.success("User logged in successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
