import httpRequest from "../utils/HttpRequest";

export const getEducations = async (page = 1) => {
  try {
    let url = `/educations?page=${page}`;
    const res = await httpRequest.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createEducation = async (data) => {
  try {
    await httpRequest.post("/educations", data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteEducation = async (id) => {
  try {
    await httpRequest.delete("/educations/" + id);
  } catch (error) {
    console.log(error);
  }
};

export const updateEducation = async ({ id, data }) => {
  try {
    await httpRequest.put("/educations/" + id, data);
  } catch (error) {
    console.log(error);
  }
};

export const getEducation = async (id) => {
  try {
    const res = await httpRequest.get("/educations/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleStatus = async (id) => {
  try {
    await httpRequest.put(`/educations/${id}/status`);
  } catch (error) {
    console.log(error);
  }
};
