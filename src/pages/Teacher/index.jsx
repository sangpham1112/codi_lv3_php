import noAvatar from "/img/avatar/no-avatar.png";
import { useEffect, useLayoutEffect } from "react";
import { GlobalContext } from "~/context/GlobalProvider";
import Modal from "~/components/Modal";
import Input from "~/components/Input";
import TableColumn from "~/components/TableColumn";
import Loading from "~/components/Loading";
import MyEditor from "~/components/Editor";
import Tab from "./components/Tab";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { updateTeacher } from "~/api/Teachers";
import { getUser } from "~/api/Users";
import { ImageLink } from "~/utils/ImageLink";

const Teacher = () => {
  const { id } = useParams();
  const { user: currentUser } = React.useContext(GlobalContext);
  const { register, handleSubmit, setValue, control } = useForm();
  const navigate = useNavigate();

  //get Teacher
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });

  const user = data?.user;

  //Edit teacher
  const { mutation: updateTeacherMutation } = useCustomMutate(
    "users",
    updateTeacher
  );
  const handleEditTeacher = (data) => {
    updateTeacherMutation.mutate({
      id: user.teacher?.id,
      data,
    });
  };

  useEffect(() => {
    const teacher = user?.teacher;
    if (teacher) {
      for (const field in teacher) {
        setValue(field, teacher[field]);
      }
    }
  }, [setValue, user]);

  useLayoutEffect(() => {
    if (currentUser && currentUser.role_id !== 1 && currentUser.id !== id) {
      navigate("/teacher/" + currentUser.id);
    }
  }, [currentUser]);

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
              title="Sửa thông tin giảng viên"
              onSubmit={handleSubmit(handleEditTeacher)}>
              <Input type="text" title="Bộ môn" {...register("subject")} />

              <Input
                type="text"
                title="Kinh nghiệm"
                {...register("experience")}
              />

              <Input
                type="number"
                title="Năm kinh nghiệm"
                {...register("exp_year")}
              />

              <Input type="text" title="Học vị" {...register("degree")} />

              <div className="mb-3">
                <label>Mô tả giảng viên</label>
                <Controller
                  control={control}
                  name="description"
                  className="form-control"
                  render={({ field }) => <MyEditor {...field} />}
                />
              </div>

              <div className="mb-3">
                <label>Thành tích</label>
                <Controller
                  control={control}
                  name="achivement"
                  className="form-control"
                  render={({ field }) => <MyEditor {...field} />}
                />
              </div>

              <div className="mb-3">
                <label>Phương pháp giảng dạy</label>
                <Controller
                  control={control}
                  name="teaching_method"
                  className="form-control"
                  render={({ field }) => <MyEditor {...field} />}
                />
              </div>
            </Modal>
          </div>
          <h5 className="card-title mb-0">Thông tin giảng viên</h5>
        </div>
        <div className="card-body">
          <div className="row g-0">
            <div className="col-sm-3 col-xl-12 col-xxl-3 mb-4 text-center">
              <img
                src={user?.avatar ? ImageLink + user.avatar : noAvatar}
                width={100}
                height={100}
                className="rounded-circle mt-2"
                alt={user.name}
              />
            </div>
          </div>
          <strong className="fs-4 fw-bold">Thông tin</strong>
          <hr />
          <TableColumn
            data={[
              {
                title: "Tên",
                desc: user.name,
              },
              {
                title: "Email",
                desc: user.email,
              },
              {
                title: "Bộ môn",
                desc: user.teacher.subject,
              },
              {
                title: "Năm kinh nghiệm",
                desc: user.teacher.exp_year + " năm",
              },
              {
                title: "Kinh nghiệm",
                desc: user.teacher.experience,
              },
              {
                title: "Học vị",
                desc: user.teacher.degree,
              },
            ]}
          />
          <Tab
            achivement={user.teacher.achivement}
            teachingMethod={user.teacher.teaching_method}
            description={user.teacher.description}
          />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
