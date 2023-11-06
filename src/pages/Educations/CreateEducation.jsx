import React from "react";
import FormWrapper from "~/components/FormWrapper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import AlertError from "~/components/AlertError";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { createEducation } from "~/api/Educations";

const CreateEducation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutation: createEducationMutation } = useCustomMutate(
    "educations",
    createEducation
  );

  const submitForm = (data) => {
    createEducationMutation.mutate(data);
  };

  return (
    <FormWrapper title="Thêm đào tạo" onSubmit={handleSubmit(submitForm)}>
      <div className="row align-items-center">
        <div className="col-md-12">
          <Input
            title="Tên Education"
            type="text"
            name="name"
            placeholder="Tên education"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <AlertError mess="Thiếu Tên Education" />
          )}
        </div>
        <div className="col-md-12">
          <Button name="Thêm" type="submit" size="lg" />
        </div>
      </div>
    </FormWrapper>
  );
};
export default CreateEducation;
