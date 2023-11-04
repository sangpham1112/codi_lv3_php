import React, { useEffect } from "react";
import Modal from "~/components/Modal";
import TableColumn from "~/components/TableColumn";
import Loading from "~/components/Loading";
import Input from "~/components/Input";
import AlertError from "~/components/AlertError";
import Select from "~/components/Select";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEducations } from "~/api/Educations";
import { getCategory, updateCategory } from "~/api/Categories";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";

const CategoryShow = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  //Get Educations
  const {
    data: dataEdu,
    isLoading: isLoadingEdu,
    isError: isErrorEdu,
    error: errorEdu,
  } = useQuery({
    queryKey: ["educations"],
    queryFn: getEducations,
  });

  const educations = dataEdu?.educations.data;

  //Get Category
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategory(id),
  });

  const category = data?.category;
  //Edit Category
  const { mutation: updateCategoryMutaion } = useCustomMutate(
    "categories",
    updateCategory
  );

  const handleEditForm = (data) => {
    updateCategoryMutaion.mutate({
      id,
      data,
    });
  };
  //add category fields in to modal fields
  useEffect(() => {
    if (category) {
      for (const field in category) {
        setValue(field, category[field]);
      }
    }
  }, [category, setValue]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error}</span>;
  }
  return (
    <div className="col-xl-10 mx-auto">
      <div className="card">
        <div className="card-header">
          <div className="card-actions float-end">
            <Modal
              isSuccess={isSubmitSuccessful}
              title="Sửa Category"
              onSubmit={handleSubmit(handleEditForm)}>
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
                {isLoadingEdu && <Loading />}
                {isErrorEdu && <span>{errorEdu}</span>}

                <Select
                  title="Education"
                  optionData={educations}
                  {...register("education_id")}>
                  {(item, index) => (
                    <option key={index} value={category.education.id}>
                      {item.name}
                    </option>
                  )}
                </Select>
              </div>
            </Modal>
          </div>
          <h5 className="card-title mb-0">Thông tin Category</h5>
        </div>
        <div className="card-body">
          <TableColumn
            data={[
              {
                title: "Tên",
                desc: category.name,
              },
              {
                title: "Education",
                desc: category.education.name,
              },
              {
                title: "Trạng thái",
                desc:
                  category.status == 1 ? "Đang hoạt động" : "Không hoạt động",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryShow;
