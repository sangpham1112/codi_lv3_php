import TopNumbers from "./components/TopNumbers";
import Loading from "~/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { dashboardData } from "~/api/Dashboard";
import ChartBar from "./components/ChartBar";
import MostPopularCourses from "./components/MostPopularCourses";
import { getPopularCourses } from "../../api/Dashboard";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");

  const { data, isError, isLoading, error } = useQuery({
    queryKey: "dashboard",
    queryFn: dashboardData,
  });

  const {
    data: popularCourseData,
    isError: isErrorPopularCourse,
    isLoading: isLoadingPopularCourse,
    error: errorPopularCourses,
    isPreviousData,
  } = useQuery({
    queryKey: ["dashboard", page],
    queryFn: () => getPopularCourses(page),
    keepPreviousData: true,
  });

  const mostPopularCourses = popularCourseData?.mostPopularCourses.data;
  // console.log(popularCourseData?.mostPopularCourses.last_page);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <>
      <div className="row mb-2 mb-xl-3">
        <div className="col-auto d-none d-sm-block">
          <h3>
            <strong>Marathon</strong> Dashboard
          </h3>
        </div>
      </div>
      <div className="row">
        <TopNumbers
          totalCourses={data?.totalCourses}
          totalStudents={data?.totalStudents}
          totalTeachers={data?.totalTeachers}
          totalPrice={data?.totalPrice}
        />
      </div>
      <div className="row">
        <div className="col-12 col-lg-5 col-xxl-4 d-flex">
          <ChartBar totalPricePerMonth={data?.totalPricePerMonth} />
        </div>
        <div className="col-12 col-lg-7 col-xxl-8 d-flex flex-column">
          {isLoadingPopularCourse && <Loading />}
          {isErrorPopularCourse && <span>{errorPopularCourses.message}</span>}
          {/* show COurses */}
          <MostPopularCourses mostPopularCourses={mostPopularCourses} />
          {/* check if last_page > 1 to show pagination */}
          {popularCourseData?.mostPopularCourses.last_page > 1 && (
            <Pagination
              isPreviousData={isPreviousData}
              lastPage={popularCourseData?.mostPopularCourses.last_page}
              currentPage={page}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
