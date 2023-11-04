import React from "react";
import Table from "~/components/Table";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { deleteEducation, getEducations, toggleStatus } from "~/api/Educations";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";

const Educations = () => {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");

  const { data, error, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["educations", page],
    queryFn: () => getEducations(page),
    keepPreviousData: true,
  });

  const { mutation: toggleEduStatusMutation } = useCustomMutate(
    "educations",
    toggleStatus
  );
  const { mutation: deleteEducationMutation } = useCustomMutate(
    "educations",
    deleteEducation
  );

  const handleDeleteEducation = (id) => {
    if (confirm("Bạn có muốn xoá không ?")) {
      deleteEducationMutation.mutate(id);
    }
  };

  const handleToggleStatus = (id) => {
    toggleEduStatusMutation.mutate(id);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error}</span>;
  }

  const educations = data?.educations.data;
  console.log(data);
  return (
    <>
      <Table
        title="Bảng Educations"
        tableHeader={["Tên", "Tình trạng", "Đổi status"]}>
        {educations?.map((item, index) => {
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
                    className="form-check-input "
                    type="checkbox"
                    checked={item.status == 1}
                    onChange={() => handleToggleStatus(item.id)}
                  />
                </div>
              </td>
              <td className="d-flex justify-content-evenly">
                <Button name="xem" to={"/educations/" + item.id} />
                <Button
                  name="xoá"
                  isPrimary={false}
                  btnColor="btn-danger"
                  onClick={() => handleDeleteEducation(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </Table>
      {data?.educations.last_page > 1 && (
        <Pagination
          isPreviousData={isPreviousData}
          data={educations}
          lastPage={data?.educations.last_page}
          currentPage={page}
        />
      )}
    </>
  );
};

export default Educations;
