import React from "react";
import Modal from "~/components/Modal";
import TableColumn from "~/components/TableColumn";
import Loading from "~/components/Loading";
import Input from "~/components/Input";
import AlertError from "~/components/AlertError";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEducation, updateEducation } from "~/api/Educations";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";

const EducationShow = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["educations", id],
    queryFn: () => getEducation(id),
  });

  const { mutation: updateEducationMutaion } = useCustomMutate(
    "educations",
    updateEducation
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const handleEditForm = (data) => {
    updateEducationMutaion.mutate({
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
  const education = data?.education;
  console.log(education);
  return (
    <div className="col-xl-10 mx-auto">
      <div className="card">
        <div className="card-header">
          <div className="card-actions float-end">
            <Modal
              isSuccess={isSubmitSuccessful}
              title="Sửa Education"
              onSubmit={handleSubmit(handleEditForm)}>
              <Input
                title="Tên Education"
                {...register("name", { required: true })}>
                {errors.name?.type === "required" && (
                  <AlertError mess="Thiếu tên" />
                )}
              </Input>
            </Modal>
          </div>
          <h5 className="card-title mb-0">Thông tin Education</h5>
        </div>
        <div className="card-body">
          <TableColumn
            data={[
              {
                title: "Tên",
                desc: education.name,
              },
              {
                title: "Trạng thái",
                desc:
                  education.status == 1 ? "Đang hoạt động" : "Không hoạt động",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationShow;
