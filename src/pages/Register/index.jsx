import React from "react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { useCustomMutate } from "~/hooks/useCustomMutate";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUser } from "../../api/Users";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { mutation: createUserMutation } = useCustomMutate("users", createUser);
  const navigate = useNavigate();

  const handeRegister = (data) => {
    createUserMutation.mutate(data);
    navigate("/login");
  };

  return (
    <main className="d-flex w-100 h-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Đăng ký</h1>
                <Link className="lead" to="/">
                  Về trang chủ
                </Link>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form onSubmit={handleSubmit(handeRegister)}>
                      <Input
                        title="Tên đầy đủ"
                        type="text"
                        placeholder="Tên đầy đủ"
                        {...register("name")}
                      />
                      <Input
                        title="Email"
                        type="email"
                        placeholder="Nhập email"
                        name="email"
                        {...register("email")}
                      />
                      <Input
                        title="Mật khẩu"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        name="password"
                        {...register("password")}
                      />
                      <Button
                        name="Đăng ký"
                        type="submit"
                        isPrimary={false}
                        btnColor="btn-success"
                        size="lg"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="text-center mb-3">
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
