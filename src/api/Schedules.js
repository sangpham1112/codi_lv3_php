import httpRequest from "../utils/HttpRequest";

export const getSchedules = async (page = 1, query = "") => {
  try {
    let url = `/schedules?page=${page}`;
    if (query !== null && query !== "") {
      url = `/schedules?query=${query}`;
    }
    const res = await httpRequest.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createSchedule = async (data) => {
  try {
    await httpRequest.post("/schedules", data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSchedule = async (id) => {
  try {
    await httpRequest.delete("/schedules/" + id);
  } catch (error) {
    console.log(error);
  }
};

export const updateSchedule = async ({ id, data }) => {
  try {
    await httpRequest.put("/schedules/" + id, data);
  } catch (error) {
    console.log(error);
  }
};

export const getSchedule = async (id) => {
  try {
    const res = await httpRequest.get("/schedules/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSchedulesByStudent = async (id) => {
  try {
    const res = await httpRequest.get(`/schedules/${id}/student`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSchedulesByTeacher = async (id) => {
  try {
    const res = await httpRequest.get(`/schedules/${id}/teacher`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const teacherPass = async (id) => {
  try {
    const res = await httpRequest.put(`/schedules/${id}/teacher`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
