import httpRequest from "../utils/HttpRequest";

export const getUsers = async (page = 1, query = "") => {
  try {
    let url = `/users?page=${page}`;
    if (query !== null && query !== "") {
      url = `/users?query=${query}`;
    }
    const res = await httpRequest.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (data) => {
  try {
    await httpRequest.post("/users", data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    await httpRequest.delete("/users/" + id);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({ id, data }) => {
  try {
    await httpRequest.put("/users/" + id, data);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const res = await httpRequest.get("/users/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleStatus = async (id) => {
  try {
    await httpRequest.put(`/users/${id}/status`);
  } catch (error) {
    console.log(error);
  }
};

export const addRoleUser = async ({ id, data }) => {
  try {
    await httpRequest.put(`/users/${id}/add-role`, data);
  } catch (error) {
    console.log(error);
  }
};

export const googleLogin = async (code) => {
  try {
    const res = await httpRequest.post("/auth/google", { code });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (data) => {
  try {
    const res = await httpRequest.post("/users/login", data);
    return { data: res.data };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const logout = async () => {
  try {
    await httpRequest.post("/users/logout");
  } catch (error) {
    console.log(error);
  }
};

export const changeAvatar = async ({ id, data }) => {
  try {
    await httpRequest.post(`/users/${id}/change-avatar`, data);
  } catch (error) {
    console.log(error);
  }
};
