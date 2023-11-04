import React from "react";
import FormWrapper from "~/components/FormWrapper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import AlertError from "~/components/AlertError";
import { useForm } from "react-hook-form";
import { createRole } from "~/api/Roles";
import { useCustomMutate } from "~/hooks/useCustomMutate";

const CreateRole = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutation } = useCustomMutate("roles", createRole);
  const submitForm = (data) => {
    mutation.mutate(data);
  };
  return (
    <FormWrapper title="Thêm Role" onSubmit={handleSubmit(submitForm)}>
      <Input
        title="Role Name"
        type="text"
        name="role_name"
        placeholder="nhập role"
        {...register("role_name", { required: true })}
      />
      {errors.role_name?.type === "required" && (
        <AlertError mess="Thiếu role" />
      )}
      <Button name="Tạo " size="lg" type="submit" />
    </FormWrapper>
  );
};

export default CreateRole;
