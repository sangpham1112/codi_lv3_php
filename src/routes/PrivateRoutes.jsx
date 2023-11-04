import React from "react";
import Dashboard from "~/pages/Dashboard";
//users
import Users from "~/pages/Users";
import UserShow from "~/pages/Users/Show";
//student
import Student from "~/pages/Student";
//teacher
import Teacher from "~/pages/Teacher";
//classes
import Courses from "~/pages/Courses";
import CreateCourse from "~/pages/Courses/CreateCourse";
import CourseShow from "~/pages/Courses/Show";
//roles
import Roles from "~/pages/Roles";
import CreateRole from "../pages/Roles/CreateRole";
import RoleShow from "../pages/Roles/RoleShow";
//categories
import Categories from "../pages/Categories";
import CategoryShow from "../pages/Categories/Show";
import CreateCategories from "../pages/Categories/CreateCategory";
//Education
import Educations from "../pages/Educations";
import EducationShow from "../pages/Educations/Show";
import CreateEducation from "../pages/Educations/CreateEducation";
//Schedule
import Schedules from "../pages/Schdules";
import CreateSchedule from "../pages/Schdules/CreateSchedule";
import ShowSchedule from "../pages/Schdules/ShowSchedule";
import TeacherPass from "../pages/Teacher/TeacherPass";

export const PrivateRoutes = [
  {
    path: "dashboard",
    element: <Dashboard />,
    allowRole: [1],
  },
  {
    path: "users",
    element: <Users />,
    allowRole: [1],
  },
  {
    path: "users/:id",
    element: <UserShow />,
    allowRole: [1, 2, 3],
  },
  // Teacher
  {
    path: "teacher/:id",
    element: <Teacher />,
    allowRole: [2],
  },
  {
    path: "/teacher/check/:id",
    element: <TeacherPass />,
    allowRole: [2],
  },
  // Student
  {
    path: "student/:id",
    element: <Student />,
    allowRole: [3],
  },
  //Course
  {
    path: "courses",
    element: <Courses />,
    allowRole: [1],
  },
  {
    path: "courses/create",
    element: <CreateCourse />,
    allowRole: [1],
  },
  {
    path: "courses/:id",
    element: <CourseShow />,
    allowRole: [1],
  },
  //ROles
  {
    path: "roles",
    element: <Roles />,
    allowRole: [1],
  },
  {
    path: "roles/create",
    element: <CreateRole />,
    allowRole: [1],
  },
  {
    path: "roles/:id",
    element: <RoleShow />,
    allowRole: [1],
  },
  //Categories
  {
    path: "categories",
    element: <Categories />,
    allowRole: [1],
  },
  {
    path: "categories/:id",
    element: <CategoryShow />,
    allowRole: [1],
  },
  {
    path: "categories/create",
    element: <CreateCategories />,
    allowRole: [1],
  },

  //Education
  {
    path: "educations",
    element: <Educations />,
    allowRole: [1],
  },
  {
    path: "educations/:id",
    element: <EducationShow />,
    allowRole: [1],
  },
  {
    path: "educations/create",
    element: <CreateEducation />,
    allowRole: [1],
  },
  //Schedule
  {
    path: "schedules",
    element: <Schedules />,
    allowRole: [1],
  },
  {
    path: "schedules/:id",
    element: <ShowSchedule />,
    allowRole: [1],
  },
  {
    path: "schedules/create",
    element: <CreateSchedule />,
    allowRole: [1],
  },
];
