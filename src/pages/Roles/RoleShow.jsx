import React from "react";
import FormWrapper from "~/components/FormWrapper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import AlertError from "~/components/AlertError";
import Loading from "~/components/Loading";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRole, updateRole } from "~/api/Roles";
import { useCustomMutate } from "~/hooks/useCustomMutate";

const ShowRole = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //Query
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["roles", id],
    queryFn: () => getRole(id),
  });

  const { mutation: updateRoleMutation } = useCustomMutate("roles", updateRole);

  const handleUpdateRole = (data) => {
    updateRoleMutation.mutate({
      id,
      data,
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error}</span>;
  }
  const role = data?.role;
  console.log(data);

  return (
    <>
      <div className="card p-3">
        <div className="card-title">Thông tin Role</div>
        <hr />
        <h5 className="mb-3">
          <strong>Tên Role: </strong>
          {role.role_name}
        </h5>
        <h5 className="mb-3">
          <strong className="pe-2">Trạng thái:</strong>
          <span
            className={
              role.status == 1 ? "badge bg-success" : "badge bg-danger"
            }>
            {role.status == 1 ? "Đang hoạt động" : "Không hoạt động"}
          </span>
        </h5>
      </div>

      <FormWrapper onSubmit={handleSubmit(handleUpdateRole)} title="Sửa role">
        <Input
          title="Role Name"
          {...register("role_name", { required: true })}
        />
        {errors.role_name?.type === "required" && (
          <AlertError mess="Thiếu role" />
        )}
        <Button name="Update" type="submit" />
      </FormWrapper>
    </>
  );
};

export default ShowRole;
