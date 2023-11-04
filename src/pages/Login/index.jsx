import React, { useContext } from "react";
import Input from "~/components/Input";
import Button from "~/components/Button";
import AlertError from "~/components/AlertError";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogin, LoginUser } from "~/api/Users";
import { useGoogleLogin } from "@react-oauth/google";
import { GlobalContext } from "~/context/GlobalProvider";
import { useForm } from "react-hook-form";

const Login = () => {
  const { SaveLoginUser } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const result = await googleLogin(codeResponse.access_token);
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.user));
      SaveLoginUser(result.user);
      navigate(from, { replace: true });
    },
  });

  const handleLogin = async (data) => {
    const { data: result, error } = await LoginUser(data);
    if (result) {
      localStorage.setItem("user", JSON.stringify(result.user));
      SaveLoginUser(result.user);
      navigate(from, { replace: true });
    } else {
      alert(JSON.stringify(error));
    }
  };
  // console.log(user);

  return (
    <main className="d-flex w-100 h-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Đăng nhập</h1>
                <Link className="lead" to="/">
                  Về trang chủ
                </Link>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <div className="d-grid gap-2 mb-3">
                      <a
                        className="btn btn-google btn-lg"
                        onClick={handleLoginGoogle}>
                        <i className="fab fa-fw fa-google" /> Đăng nhập Google
                      </a>
                    </div>
                    <div className="row">
                      <div className="col">
                        <hr />
                      </div>
                      <div className="col-auto text-uppercase d-flex align-items-center">
                        Hoặc
                      </div>
                      <div className="col">
                        <hr />
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(handleLogin)}>
                      <Input
                        title="Email"
                        type="email"
                        placeholder="Nhập vào email"
                        {...register("email", { required: true })}>
                        {errors.email?.type === "required" && (
                          <AlertError mess="Thiếu Email" />
                        )}
                      </Input>
                      <Input
                        title="Mật khẩu"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...register("password", { required: true })}>
                        {errors.password?.type === "required" && (
                          <AlertError mess="Thiếu Email" />
                        )}
                      </Input>
                      <Button name="Đăng nhập" type="submit" size="lg" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="text-center mb-3">
                Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
