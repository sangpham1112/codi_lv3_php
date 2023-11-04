import React, { useEffect } from "react";
import Modal from "~/components/Modal";
import TableColumn from "~/components/TableColumn";
import Loading from "~/components/Loading";
import Input from "~/components/Input";
import Select from "~/components/Select";
import Timeline from "~/components/Timeline";
import AlertError from "~/components/AlertError";
import EditModule from "./components/EditModule";
import AddModule from "./components/AddModule";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourse, updateCourse } from "~/api/Courses";
import { getCategories } from "~/api/Categories";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { ImageLink } from "~/utils/ImageLink";
import { updateModules } from "~/api/Courses";
import { formatPrice } from "~/utils/formatPrice";

const CourseShow = () => {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentModule, setCurrentModule] = React.useState([]);
  const { mutation: updateModulesMutation } = useCustomMutate(
    "courses",
    updateModules
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Get Cates
  const {
    data: dataCate,
    isLoading: isLoadingCate,
    isError: isErrorCate,
    error: errorCate,
  } = useQuery({
    queryKey: "categories",
    queryFn: getCategories,
  });

  const categories = dataCate?.categories.data;

  //Get Coure
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => getCourse(id),
  });

  const course = data?.course;

  // Edit Form Action
  const { mutation: updateCoursenMutaion } = useCustomMutate(
    "courses",
    updateCourse
  );
  const handleEditForm = (data) => {
    updateCoursenMutaion.mutate({
      id,
      data,
    });
  };
  //setValue for cuurent Course
  useEffect(() => {
    if (course) {
      for (const field in course) {
        setValue(field, course[field]);
      }
    }
  }, [course, setValue]);

  const handleGetItem = (indexModule, item) => {
    setCurrentIndex(indexModule);
    setCurrentModule(item);
  };
  //Delete Module

  const handleDeleteModule = (indexModule) => {
    const courseDetail = JSON.parse(course?.detail).filter(
      (_, index) => index !== indexModule
    );
    // console.log(courseDetail);
    if (confirm("Bạn muốn xoá module này ?")) {
      updateModulesMutation.mutate({
        id,
        detail: JSON.stringify(courseDetail),
      });
    }
  };

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
              title="Sửa Course"
              onSubmit={handleSubmit(handleEditForm)}>
              {/* Tên Khoá học */}
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

              {/* Tên Categories */}
              <div className="col-md-12">
                {isLoadingCate && <Loading />}
                {isErrorCate && <span>{errorCate}</span>}
                <Select
                  title="Categories"
                  optionData={categories}
                  {...register("category_id")}>
                  {(item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  )}
                </Select>
              </div>

              {/* Price */}
              <div className="col-md-4">
                <Input
                  title="Giá cả"
                  type="number"
                  placeholder="Tên education"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />

                {errors.price?.type === "required" && (
                  <AlertError mess="Thiếu Tên Education" />
                )}
                {errors.price?.type === "valueAsNumber" && (
                  <AlertError mess="Không phải số" />
                )}
              </div>

              {/* Duration */}
              <div className="col-md-4">
                <Input
                  title="Thời lượng"
                  type="number"
                  placeholder="Tên education"
                  {...register("duration", { required: true })}
                />

                {errors.duration?.type === "required" && (
                  <AlertError mess="Thiếu thời lượng" />
                )}
              </div>

              {/* Giảm giá */}
              <div className="col-md-4">
                <Input
                  title="Giảm giá"
                  type="number"
                  placeholder="Giảm giá"
                  {...register("discount", { required: true })}
                />

                {errors.discount?.type === "required" && (
                  <AlertError mess="Thiếu giảm giá" />
                )}
              </div>

              {/* Summary */}
              <div className="form-floating col-md-12">
                <textarea
                  className="form-control mb-3"
                  placeholder="Leave a comment here"
                  style={{ height: "50px" }}
                  {...register("summary", { required: true })}
                  id="summary"></textarea>
                <label htmlFor="summary">Tóm tắt</label>

                {errors.summary?.type === "required" && (
                  <AlertError mess="Thiếu Tóm tắt" />
                )}
              </div>
            </Modal>
          </div>
          <h5 className="card-title mb-0">Thông tin Course</h5>
        </div>
        <div className="card-body">
          <div className="row g-0">
            <h5 className="text-secondary fw-bold">Ảnh đại diện</h5>
            <div className="col-sm-3 col-xl-12 col-xxl-3 mb-4">
              <img
                src={ImageLink + course?.image}
                width={200}
                height={200}
                className="rounded mt-2"
                alt="Angelica Ramos"
              />
            </div>
          </div>
          <TableColumn
            data={[
              {
                title: "Tên",
                desc: course.name,
              },
              {
                title: "Thời lượng",
                desc: course.duration,
              },
              {
                title: "Giá",
                desc: formatPrice(course.price),
              },
              {
                title: "Lớp",
                desc: course.grade,
              },
              {
                title: "Giảm gía",
                desc: `${course.discount}%`,
              },
              {
                title: "Category",
                desc: course.category.name,
              },
              {
                title: "Tóm tắt",
                desc: course.summary,
              },
              {
                title: "Trạng thái",
                desc: course.status == 1 ? "Đang hoạt động" : "Không hoạt động",
              },
            ]}
          />
          {/* List module */}
          <hr />
          <h4 className="fs-4 text-secondary fw-bold">Modules</h4>
          <Timeline data={JSON.parse(course.detail)}>
            {(item, index) => {
              return (
                <>
                  <strong>{item.title}</strong>
                  <span
                    className="float-end text-muted text-sm"
                    style={{ cursor: "pointer" }}>
                    <div
                      className="badge bg-primary p-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleGetItem(index, item)}>
                      Sửa Module
                    </div>
                    <div
                      className="badge bg-danger ms-1 p-2"
                      onClick={() => handleDeleteModule(index)}>
                      Xoá
                    </div>
                  </span>
                  <p dangerouslySetInnerHTML={{ __html: item.info }}></p>
                </>
              );
            }}
          </Timeline>
          {/* Module Edit Modal */}

          <EditModule
            courseDetail={JSON.parse(course.detail)}
            currentIndex={currentIndex}
            id={id}
            updateModulesMutation={updateModulesMutation}
            currentModule={currentModule}
          />
          <hr />
          <AddModule
            courseDetail={JSON.parse(course.detail)}
            id={id}
            updateModulesMutation={updateModulesMutation}
          />
        </div>
      </div>
    </div>
  );
};
export default CourseShow;
