import httpRequest from "../utils/HttpRequest";

export const getCourses = async (page = 1, query = "") => {
  try {
    let url = `/courses?page=${page}`;
    if (query !== null && query !== "") {
      url = `/courses?query=${query}`;
    }
    const res = await httpRequest.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = async (data) => {
  try {
    await httpRequest.post("/courses", data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = async (id) => {
  try {
    await httpRequest.delete("/courses/" + id);
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = async ({ id, data }) => {
  try {
    await httpRequest.put("/courses/" + id, data);
  } catch (error) {
    console.log(error);
  }
};

export const getCourse = async (id) => {
  try {
    const res = await httpRequest.get("/courses/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleStatus = async (id) => {
  try {
    await httpRequest.put(`/courses/${id}/status`);
  } catch (error) {
    console.log(error);
  }
};

export const updateModules = async ({ id, detail }) => {
  try {
    await httpRequest.put(`/courses/${id}/module`, {
      detail,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCourse = async () => {
  try {
    const res = await httpRequest.get(`/courses/all`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
