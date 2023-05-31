import axios from "axios";
import { instance } from "./services";

const login = async ({ email, password }) => {
  const { data } = await instance.post("/login", {
    email,
    password,
  });

  return data;
};

export const auth = {
  login,
};
