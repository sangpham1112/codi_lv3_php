import React from "react";
import Table from "~/components/Table";
import Loading from "~/components/Loading";
import Button from "~/components/Button";
import Pagination from "~/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { deleteUser, toggleStatus, getUsers } from "~/api/Users";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  let query = searchParams.get("query");

  const { data, error, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["users", page, query],
    queryFn: () => getUsers(page, query),
    keepPreviousData: true,
  });
  //Mutation
  const { mutation: deleteUserMutation } = useCustomMutate("users", deleteUser);
  const { mutation: toggleUserMutation } = useCustomMutate(
    "users",
    toggleStatus
  );
  //toggle status
  const handleToggleStatus = (id) => {
    toggleUserMutation.mutate(id);
  };

  //delete role
  const handleDeleteUser = (id) => {
    if (confirm("Bạn có muốn xoá user này ?")) {
      deleteUserMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span className="alert alert-danger">{error.message}</span>;
  }

  // Sử dụng toán tử optional chaining để tránh lỗi khi data chưa sẵn sàng
  const users = data?.users?.data;

  return (
    <>
      <Table
        isSearch={true}
        title="Bảng Users"
        tableHeader={["Tên User", "Email", "Status", "Đổi status"]}>
        {/* Kiểm tra xem roles có tồn tại trước khi sử dụng .map() */}
        {users?.map((item, index) => {
          return (
            <tr key={item.id}>
              <td className="fw-bold">#{++index}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
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
                <Button name="Xem" to={"/users/" + item.id} />
                <Button
                  name="Xoá"
                  btnColor="btn-danger"
                  isPrimary={false}
                  onClick={() => handleDeleteUser(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </Table>
      {data?.users.last_page > 1 && (
        <Pagination
          isPreviousData={isPreviousData}
          data={users}
          lastPage={data?.users.last_page}
          currentPage={page}
        />
      )}
    </>
  );
};

export default Users;
