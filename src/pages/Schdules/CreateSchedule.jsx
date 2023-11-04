import FormWrapper from "~/components/FormWrapper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Loading from "~/components/Loading";
import AlertError from "~/components/AlertError";
import Select from "~/components/Select";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { useQuery } from "@tanstack/react-query";
import { getAllCourse } from "../../api/Courses";
import { getTeachers } from "~/api/Teachers";
import { createSchedule } from "../../api/Schedules";

const CreateSchedule = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  //Get Courses
  const {
    data: CoursesData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourse,
  });
  const courses = CoursesData?.courses;

  //Get Teacher
  const {
    data: TeachersData,
    isError: isErrorTeachers,
    isLoading: isLoadingTeachers,
    error: errorTeachers,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  const teachers = TeachersData?.teachers;

  //Create Schedule
  const { mutation: createScheduleMutaion } = useCustomMutate(
    "schedules",
    createSchedule
  );

  const submitForm = (data) => {
    console.log(data);
    createScheduleMutaion.mutate(data);
  };

  return (
    <FormWrapper title="Thêm schedule" onSubmit={handleSubmit(submitForm)}>
      <div className="row align-items-center">
        <div className="col-md-12">
          <Input
            title="Tên"
            type="text"
            name="name"
            placeholder="Tên lớp học"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <AlertError mess="Thiếu Tên lớp học" />
          )}
        </div>

        <div className="col-md-6">
          <Input
            title="Lịch học"
            type="text"
            placeholder="VD: 20:00 | Thứ 5"
            {...register("schedule_time", { required: true })}
          />
          {errors.schedule_time?.type === "required" && (
            <AlertError mess="Thiếu Lịch học" />
          )}
        </div>

        <div className="col-md-6">
          {isLoading && <Loading />}
          {isError && <span>{error.message}</span>}
          <Select
            title="Khoá học"
            optionData={courses}
            onChange={(e) => setValue("course_id", e.target.value)}>
            {(item, index) => (
              <option value={item.id} key={index}>
                {item.name}
              </option>
            )}
          </Select>
        </div>

        <div className="col-md-6">
          {isLoadingTeachers && <Loading />}
          {isErrorTeachers && <span>{errorTeachers.message}</span>}
          <Select
            title="Giảng viên"
            optionData={teachers}
            onChange={(e) => setValue("user_id", e.target.value)}>
            {(item, index) => (
              <option value={item.user.id} key={index}>
                {item.user.name} - {item.subject}
              </option>
            )}
          </Select>
        </div>

        <div className="col-md-6">
          <Input
            title="Số tiết"
            type="number"
            placeholder="Tiết"
            {...register("duration", { required: true })}
          />
          {errors.duration?.type === "required" && (
            <AlertError mess="Thiếu Số tiết" />
          )}
        </div>

        <div className="col-md-12">
          <Button name="Tạo" type="submit" size="lg" />
        </div>
      </div>
    </FormWrapper>
  );
};

export default CreateSchedule;
