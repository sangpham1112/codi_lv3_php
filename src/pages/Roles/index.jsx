import React from "react";
import Table from "~/components/Table";
import Loading from "~/components/Loading";
import Button from "~/components/Button";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "~/api/Roles";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { deleteRole, toggleStatus } from "~/api/Roles";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";

const Roles = () => {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");

  const { data, error, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["roles", page],
    queryFn: () => getRoles(page),
    keepPreviousData: true,
  });
  //Mutation
  const { mutation: deleteRoleMutation } = useCustomMutate("roles", deleteRole);
  const { mutation: toggleRoleMutation } = useCustomMutate(
    "roles",
    toggleStatus
  );
  //toggle status
  const handleToggleStatus = (id) => {
    toggleRoleMutation.mutate(id);
  };

  //delete role
  const handleDeleteRole = (id) => {
    if (confirm("Bạn có muốn xoá role này ?")) {
      deleteRoleMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span className="alert alert-danger">{error.message}</span>;
  }

  // Sử dụng toán tử optional chaining để tránh lỗi khi data chưa sẵn sàng
  const roles = data?.roles?.data;

  return (
    <>
      <Table
        title="Bảng Roles"
        tableHeader={["Tên Role", "Status", "Đổi status"]}>
        {/* Kiểm tra xem roles có tồn tại trước khi sử dụng .map() */}
        {roles?.map((item, index) => {
          return (
            <tr key={item.id}>
              <td>{++index}</td>
              <td>{item.role_name}</td>
              <td>
                {item.status == 1 ? (
                  <span className="badge bg-success">Đang hoạt động</span>
                ) : (
                  <span className="badge bg-danger">Không hoạt động</span>
                )}
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
                <Button name="Xem" to={"/roles/" + item.id} />
                <Button
                  name="Xoá"
                  btnColor="btn-danger"
                  isPrimary={false}
                  onClick={() => handleDeleteRole(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </Table>
      {data?.roles.last_page > 1 && (
        <Pagination
          isPreviousData={isPreviousData}
          data={roles}
          lastPage={data?.roles.last_page}
          currentPage={page}
        />
      )}
    </>
  );
};

export default Roles;
