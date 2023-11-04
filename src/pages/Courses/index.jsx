import React from "react";
import Table from "~/components/Table";
import Button from "~/components/Button";
import { useQuery } from "@tanstack/react-query";
import { deleteCourse, getCourses, toggleStatus } from "~/api/Courses";
import Loading from "~/components/Loading";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { useSearchParams } from "react-router-dom";
import Pagination from "~/components/Pagination";

const Courses = () => {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  let query = searchParams.get("query");

  const { data, error, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["courses", page, query],
    queryFn: () => getCourses(page, query),
    keepPreviousData: true,
  });
  // Delete Course
  const { mutation: deleteCourseMutation } = useCustomMutate(
    "courses",
    deleteCourse
  );

  const handleDeleteCourse = (id) => {
    if (confirm("Bạn có muốn xoá không ?")) {
      deleteCourseMutation.mutate(id);
    }
  };

  //Toggle Status
  const { mutation: toggleCourseStatusMutation } = useCustomMutate(
    "courses",
    toggleStatus
  );

  const handleToggleStatus = (id) => {
    toggleCourseStatusMutation.mutate(id);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error}</span>;
  }

  const courses = data?.courses.data;
  console.log(data);
  return (
    <>
      <Table
        isSearch={true}
        title="Bảng Khoá học"
        tableHeader={["Tên", "Tình trạng", "Đổi status"]}>
        {courses?.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <strong>#{++index}</strong>
              </td>
              <td>{item.name}</td>
              <td>
                <span
                  className={
                    "badge " +
                    (item.status == 1
                      ? "badge-success-light"
                      : "badge-danger-light")
                  }>
                  {item.status == 1 ? "Hoạt động" : "Không hoạt động"}
                </span>
              </td>
              <td>
                <div className="form-check form-switch w-25">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.status == 1}
                    onChange={() => handleToggleStatus(item.id)}
                  />
                </div>
              </td>
              <td className="d-flex justify-content-evenly">
                <Button name="xem" to={"/courses/" + item.id} />
                <Button
                  name="xoá"
                  isPrimary={false}
                  btnColor="btn-danger"
                  onClick={() => handleDeleteCourse(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </Table>
      {data?.courses.last_page > 1 && (
        <Pagination
          isPreviousData={isPreviousData}
          data={courses}
          lastPage={data?.courses.last_page}
          currentPage={page}
        />
      )}
    </>
  );
};

export default Courses;
