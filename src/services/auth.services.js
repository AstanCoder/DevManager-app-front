import { getCookie } from "./cookies";
import services from "./services";
import { auth } from "./auth";
import Cookies from "js-cookie";

export const saveToken = (jwt) => Cookies.set("token", jwt);
export const getToken = () => Cookies.get("token");

export const validateSession = async (token) => {
  try {
    if (token) {
      const { data } = await services.getProfile(token);

      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserData = async (token) => {
  try {
    const data = await services.getProfile(token);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return getCookie("token");
};

export const authenticate = async ({ email, password }) => {
  const data = await auth.login({ email, password });
  saveToken(data?.token);
  return data;
};
