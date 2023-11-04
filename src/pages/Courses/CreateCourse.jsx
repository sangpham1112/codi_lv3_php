import React from "react";
import FormWrapper from "~/components/FormWrapper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import AlertError from "~/components/AlertError";
import Select from "~/components/Select";
import Modules from "./components/Modules";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { createCourse } from "~/api/Courses";
import { getCategories } from "~/api/Categories";
import { useQuery } from "@tanstack/react-query";

const CreateClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [modules, setModules] = React.useState([]);

  //change Image
  const [image, setImage] = React.useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };

  React.useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  //Categories
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { mutation: createCourseMutation } = useCustomMutate(
    "courses",
    createCourse
  );

  const submitForm = (data) => {
    let formData = new FormData();
    const courseData = {
      ...data,
      detail: JSON.stringify(modules),
    };
    //append image to formdata
    formData.append("image", image);
    //append others data to formdata.
    for (let key in courseData) {
      formData.append(key, courseData[key]);
    }
    //send data to server
    createCourseMutation.mutate(formData);
  };

  const categories = data?.categories.data;

  return (
    <FormWrapper title="Thêm khoá học" onSubmit={handleSubmit(submitForm)}>
      <div className="row align-items-center">
        <div className="col-md-12">
          <Input
            title="Tên"
            type="text"
            name="name"
            placeholder="Tên khoá học"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <AlertError mess="Thiếu Tên Education" />
          )}
        </div>

        <div className="col-md-6">
          <Input
            title="Lớp"
            type="text"
            placeholder="Tên khoá học"
            {...register("grade", { required: true })}
          />
          {errors.grade?.type === "required" && (
            <AlertError mess="Thiếu Grade" />
          )}
        </div>

        <div className="col-md-6">
          {isLoading && <Loading />}
          {isError && <span>{error}</span>}
          <Select
            title="Categories"
            optionData={categories}
            onChange={(e) => setValue("category_id", e.target.value)}>
            {(item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            )}
          </Select>
        </div>

        <div className="col-md-4">
          <Input
            title="Giá cả"
            type="number"
            name="price"
            placeholder="Giá"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price?.type === "required" && (
            <AlertError mess="Thiếu Tên Education" />
          )}
          {errors.price?.type === "valueAsNumber" && (
            <AlertError mess="Không phải số" />
          )}
        </div>

        <div className="col-md-4">
          <Input
            title="Thời lượng"
            type="number"
            name="duration"
            placeholder="Thời lượng"
            {...register("duration", { required: true })}
          />
          {errors.duration?.type === "required" && (
            <AlertError mess="Thiếu thời lượng" />
          )}
        </div>

        <div className="col-md-4">
          <Input
            title="Giảm giá"
            type="number"
            name="discount"
            placeholder="Giảm giá"
            {...register("discount", { required: true })}
          />
          {errors.discount?.type === "required" && (
            <AlertError mess="Thiếu giảm giá" />
          )}
        </div>

        <div className="form-floating col-md-12">
          <textarea
            className="form-control mb-3"
            placeholder="Leave a comment here"
            {...register("summary", { required: true })}
            style={{ height: "50px" }}
            id="summary"></textarea>
          <label htmlFor="summary">Tóm tắt</label>

          {errors.summary?.type === "required" && (
            <AlertError mess="Thiếu Tóm tắt" />
          )}
        </div>

        <div className="form-floating col-md-12">
          <img
            src={image.preview}
            alt=""
            className="img-fluid w-25 h-25 mb-3 rounded"
          />

          <Input type="file" title="Hình ảnh" onChange={handleImage} />
        </div>

        <hr />
        <div className="col-md-12">
          <Modules modules={modules} setModules={setModules} />
        </div>

        <div className="col-md-12">
          <Button name="Tạo" type="submit" size="lg" />
        </div>
      </div>
    </FormWrapper>
  );
};
export default CreateClass;
