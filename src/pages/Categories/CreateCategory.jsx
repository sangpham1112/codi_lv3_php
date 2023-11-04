import React from "react";
import FormWrapper from "~/components/FormWrapper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Select from "~/components/Select";
import AlertError from "~/components/AlertError";
import Loading from "~/components/Loading";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { createCategory } from "~/api/Categories";
import { useForm } from "react-hook-form";
import { getEducations } from "~/api/Educations";
import { useQuery } from "@tanstack/react-query";

const CreateCategories = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: "educations",
    queryFn: getEducations,
  });
  const educations = data?.educations.data;

  const { mutation: createCategoryMutation } = useCustomMutate(
    "categories",
    createCategory
  );

  const submitForm = (data) => {
    console.log(data);
    createCategoryMutation.mutate(data);
  };

  return (
    <FormWrapper title="Thêm Category" onSubmit={handleSubmit(submitForm)}>
      <div className="row align-items-center">
        <div className="col-md-12">
          <Input
            title="Tên Category"
            type="text"
            name="name"
            placeholder="Tên Category"
            {...register("name", { required: true })}
          />

          {errors.name?.type === "required" && (
            <AlertError mess="Thiếu Tên Category" />
          )}
        </div>
        <div className="col-md-12">
          {isLoading && <Loading />}
          {isError && <span>{error}</span>}

          <Select
            title="Education"
            {...register("education_id")}
            optionData={educations}
            onChange={(e) => setValue("education_id", e.target.value)}>
            {(item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            )}
          </Select>
        </div>
        <div className="col-md-12">
          <Button name="Thêm" type="submit" size="lg" />
        </div>
      </div>
    </FormWrapper>
  );
};
export default CreateCategories;
