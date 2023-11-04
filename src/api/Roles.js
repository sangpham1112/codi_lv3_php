import httpRequest from "../utils/HttpRequest";

export const getRoles = async (page = 1) => {
  try {
    let url = `/roles?page=${page}`;
    const res = await httpRequest.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createRole = async (data) => {
  try {
    await httpRequest.post("/roles", data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRole = async (id) => {
  try {
    await httpRequest.delete("/roles/" + id);
  } catch (error) {
    console.log(error);
  }
};

export const updateRole = async ({ id, data }) => {
  try {
    await httpRequest.put("/roles/" + id, data);
  } catch (error) {
    console.log(error);
  }
};

export const getRole = async (id) => {
  try {
    const res = await httpRequest.get("/roles/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleStatus = async (id) => {
  try {
    await httpRequest.put(`/roles/${id}/status`);
  } catch (error) {
    console.log(error);
  }
};
