import React from "react";
import Table from "~/components/Table";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { deleteCategory, getCategories, toggleStatus } from "~/api/Categories";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";

const Categories = () => {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");

  const { data, error, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => getCategories(page),
    keepPreviousData: true,
  });

  const { mutation: toggleCateStatusMutation } = useCustomMutate(
    "categories",
    toggleStatus
  );
  const { mutation: deleteCateMutation } = useCustomMutate(
    "categories",
    deleteCategory
  );

  const handleDeleteCategory = (id) => {
    if (confirm("Bạn có muốn xoá không ?")) {
      deleteCateMutation.mutate(id);
    }
  };

  const handleToggleStatus = (id) => {
    toggleCateStatusMutation.mutate(id);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error}</span>;
  }

  const categories = data?.categories.data;
  console.log(data);
  return (
    <>
      <Table
        title="Bảng loại khoá học"
        tableHeader={["Tên", "Education", "Tình trạng", "Đổi status"]}>
        {categories?.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <strong>#{++index}</strong>
              </td>
              <td>{item.name}</td>
              <td>{item.education.name}</td>
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
                <Button name="xem" to={"/categories/" + item.id} />
                <Button
                  name="xoá"
                  isPrimary={false}
                  btnColor="btn-danger"
                  onClick={() => handleDeleteCategory(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </Table>
      {data?.categories.last_page > 1 && (
        <Pagination
          isPreviousData={isPreviousData}
          data={categories}
          lastPage={data?.categories.last_page}
          currentPage={page}
        />
      )}
    </>
  );
};

export default Categories;
