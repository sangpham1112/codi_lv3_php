import React, { useEffect } from "react";
import Modal from "~/components/Modal";
import TableColumn from "~/components/TableColumn";
import Loading from "~/components/Loading";
import Input from "~/components/Input";
import Select from "~/components/Select";
import AlertError from "~/components/AlertError";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { getSchedule, updateSchedule } from "../../api/Schedules";
import { getTeachers } from "../../api/Teachers";
import { getAllCourse } from "../../api/Courses";

const ShowSchedule = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
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
  //Schedule
  const {
    data: DataSchedule,
    isError: isErrorSchedule,
    isLoading: isLoadingSchedule,
    error: errorSchedule,
  } = useQuery({
    queryKey: ["schedules", id],
    queryFn: () => getSchedule(id),
  });

  const schedule = DataSchedule?.schedule;

  // Edit Form Action
  const { mutation: updateScheduleMutaion } = useCustomMutate(
    "schedules",
    updateSchedule
  );
  const handleEditForm = (data) => {
    // console.log(data);
    updateScheduleMutaion.mutate({
      id,
      data,
    });
  };
  //setValue for cuurent Course
  useEffect(() => {
    if (schedule) {
      for (const field in schedule) {
        setValue(field, schedule[field]);
      }
    }
  }, [schedule, setValue]);

  if (isLoadingSchedule) {
    return <Loading />;
  }
  if (isErrorSchedule) {
    return <span>{errorSchedule}</span>;
  }

  return (
    <div className="col-xl-10 mx-auto">
      <div className="card">
        <div className="card-header">
          <div className="card-actions float-end">
            <Modal
              isSuccess={isSubmitSuccessful}
              title="Sửa Schedule"
              onSubmit={handleSubmit(handleEditForm)}>
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

              <div className="col-md-8">
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
            </Modal>
          </div>
          <h5 className="card-title mb-0">Thông tin Schedule</h5>
        </div>
        <div className="card-body">
          <TableColumn
            data={[
              {
                title: "Tên",
                desc: schedule.name,
              },
              {
                title: "Môn học",
                desc: schedule.course.name,
              },
              {
                title: "Lịnh học",
                desc: schedule.schedule_time,
              },
              {
                title: "Giảng viên",
                desc: schedule.user.name,
              },
              {
                title: "Tiến độ",
                desc: (
                  <div className="progress w-50">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: (schedule.pass / schedule.duration) * 100 + "%",
                      }}
                      aria-valuenow={(schedule.pass / schedule.duration) * 100}
                      aria-valuemin={0}
                      aria-valuemax={100}>
                      {(schedule.pass / schedule.duration) * 100}%
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowSchedule;
