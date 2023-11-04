import httpRequest from "../utils/HttpRequest";

export const getCategories = async (page = 1) => {
  try {
    let url = `/categories?page=${page}`;
    const res = await httpRequest.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (data) => {
  try {
    await httpRequest.post("/categories", data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id) => {
  try {
    await httpRequest.delete("/categories/" + id);
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async ({ id, data }) => {
  try {
    let url = `/categories/${id}`;
    await httpRequest.put(url, data);
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (id) => {
  try {
    const res = await httpRequest.get("/categories/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleStatus = async (id) => {
  try {
    await httpRequest.put(`/categories/${id}/status`);
  } catch (error) {
    console.log(error);
  }
};
