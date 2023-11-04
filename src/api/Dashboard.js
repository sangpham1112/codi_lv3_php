import httpRequest from "../utils/HttpRequest";

export const dashboardData = async () => {
  try {
    const res = await httpRequest.get("/dashboard");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPopularCourses = async (page = 1) => {
  try {
    let url = `/dashboard/popular-courses?page=${page}`;
    const res = await httpRequest.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
