import React, { useEffect } from "react";
import noAvatar from "/img/avatar/no-avatar.png";
import TableColumn from "~/components/TableColumn";
import Input from "~/components/Input";
import Modal from "~/components/Modal";
import AlertError from "~/components/AlertError";
import Loading from "~/components/Loading";
import { GlobalContext } from "~/context/GlobalProvider";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "~/api/Users";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import UpdateRoleUser from "./components/UpdateRoleUser";
import ChangeAvatar from "./components/ChangeAvatar";
import { ImageLink } from "~/utils/ImageLink";

const UserShow = () => {
  const { id } = useParams();
  const { user: currentUser } = React.useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { mutation: updateUserMutation } = useCustomMutate("users", updateUser);

  //Users
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });

  const handleUpdateUser = (data) => {
    updateUserMutation.mutate({
      id,
      data,
    });
  };

  const user = data?.user;

  useEffect(() => {
    if (user) {
      for (const field in user) {
        setValue(field, user[field]);
      }
    }
  }, [setValue, user]);

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
            <Modal title="Sửa user" onSubmit={handleSubmit(handleUpdateUser)}>
              <div className="col-md-12">
                <Input
                  title="Tên User"
                  type="text"
                  name="name"
                  placeholder="Tên Category"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <AlertError mess="Thiếu Tên " />
                )}
              </div>

              <div className="col-md-12">
                <Input
                  title="Email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />

                {errors.email?.type === "required" && (
                  <AlertError mess="Thiếu Email " />
                )}
              </div>
            </Modal>
          </div>
          <h5 className="card-title mb-0">Thông tin user</h5>
        </div>
        <div className="card-body">
          <div className="row g-0">
            <div className="col-sm-3 col-xl-8 col-xxl-3 text-center">
              <img
                src={user?.avatar ? ImageLink + user?.avatar : noAvatar}
                width={100}
                height={100}
                className="rounded-circle mt-2"
                alt="Angelica Ramos"
              />
              <ChangeAvatar id={id} />
            </div>
            {currentUser?.role_id == 1 && <UpdateRoleUser id={id} />}
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
                title: "Role",
                desc: user?.role?.role_name ?? "Không có role",
              },
              {
                title: "Trạng thái",
                desc: user.status == 1 ? "Đang hoạt động" : "Không hoạt động",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default UserShow;
