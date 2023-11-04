import React from "react";
import Select from "~/components/Select";
import Button from "~/components/Button";
import FormWrapper from "~/components/FormWrapper";
import Loading from "~/components/Loading";
import { addRoleUser } from "~/api/Users";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { getRoles } from "~/api/Roles";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { GlobalContext } from "../../../context/GlobalProvider";
import { logout } from "../../../api/Users";

const UpdateRoleUser = ({ id }) => {
  const { handleSubmit, control } = useForm();
  const { Logout } = React.useContext(GlobalContext);
  const {
    data: dataRoles,
    isError: isErrorRole,
    isLoading: isLoadingRole,
    error: errorRole,
  } = useQuery({
    queryKey: ["roles", id],
    queryFn: getRoles,
  });

  const roles = dataRoles?.roles.data;

  const { mutation: addRoleUserMutation } = useCustomMutate(
    "users",
    addRoleUser
  );

  const updateRole = (data) => {
    addRoleUserMutation.mutate({ id, data });
  };

  return (
    <div className="col-md-4">
      <FormWrapper onSubmit={handleSubmit(updateRole)}>
        {isLoadingRole && <Loading />}
        {isErrorRole && <span>{errorRole}</span>}

        <Controller
          control={control}
          name="role_id"
          render={({ field }) => (
            <Select title="Thêm Role" optionData={roles} {...field}>
              {(item, index) => (
                <option key={index} value={item.id}>
                  {item.role_name}
                </option>
              )}
            </Select>
          )}
        />
        <Button name="Cập nhật" type="submit" />
      </FormWrapper>
    </div>
  );
};

export default UpdateRoleUser;
