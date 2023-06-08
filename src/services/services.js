import { Axios } from "axios";
import Cookies from "js-cookie";

export const instance = new Axios({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    access_token: Cookies.get("token"),
    Accept: "*",
  },
  transformRequest: (values) => JSON.stringify(values),
  transformResponse: (data) => JSON.parse(data),
});

const getProfile = async (token) => {
  return instance.get("/profile", {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
};

const listTeams = async () => {
  return await instance.get("/teams");
};

const listUserTypes = async () => {
  return await instance.get("/user/types");
};

const createUser = async (values) => {
  return await instance.post("/signup", values);
};

const listProjects = async () => {
  return await instance
    .get("/project/list")
    .then((data) => data?.data?.results);
};

const deleteProject = async (id) => {
  return await instance.delete(`/project/delete/${id}`);
};

const listClients = async () => {
  return await instance.get("/client/list").then((data) => data?.data?.results);
};

const createClient = async (values) => {
  return await instance.post("/client", values);
};

const createProject = async (values) => {
  return await instance.post("/project", values);
};

const createTask = async (id, values) => {
  return await instance.post(`/project/${id}/task`, values);
};

const listTask = async ({ queryKey }) => {
  const [_, id] = queryKey;

  if (!id) {
    return null;
  }
  return await instance
    .get(`/project/${id}/task/list`)
    .then((data) => data?.data?.results);
};

const listUser = async () => {
  return await instance.get("/user/list").then((data) => data?.data?.results);
};

const deleteUser = async (id) => {
  return await instance.delete(`/user/${id}`);
};

const listTaskStatus = async()=>{
  return await instance.get("/task/status").then((data) => data?.data?.results)
}

const updateTask = async(id, status_id)=>{
  return await instance.post(`/task/status`, {id, status_id})
}

const deleteTask = async(id)=>{
  return await instance.delete(`/task/delete/${id}`)
}

const services = {
  getProfile,
  listTeams,
  listUserTypes,
  createUser,
  listProjects,
  deleteProject,
  listClients,
  createClient,
  createProject,
  createTask,
  listTask,
  listUser,
  deleteUser,
  listTaskStatus,
  updateTask,
  deleteTask

};

export default services;
