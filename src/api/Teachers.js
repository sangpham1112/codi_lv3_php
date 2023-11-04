import httpRequest from "../utils/HttpRequest";

export const getTeachers = async () => {
  try {
    const res = await httpRequest.get(`/teachers/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTeacher = async ({ id, data }) => {
  try {
    await httpRequest.put(`/teachers/${id}`, data);
  } catch (error) {
    console.log(error);
  }
};

export const getTeacher = async (id) => {
  try {
    const res = await httpRequest.get("/teachers/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTeacher = async (idUser) => {
  try {
    const res = await httpRequest.post("/teachers", {
      user_id: idUser,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
