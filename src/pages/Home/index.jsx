import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "~/context/GlobalProvider";

const Home = () => {
  const { user } = useContext(GlobalContext);
  return (
    <main className="d-flex w-100 h-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Trang chủ</h1>
                <p className="lead">Trang quản trị</p>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3 ">
                    <div className="d-grid gap-2 mb-3">
                      <Link
                        className="btn btn-google btn-lg"
                        to={"/student/" + user.id}>
                        <i className="fa-solid fa-user"></i> Vào trang sinh viên
                      </Link>
                      <Link
                        className="btn btn-facebook btn-lg my-2"
                        to={"/teacher/" + user.id}>
                        <i className="fa-solid fa-chalkboard-user"></i> Vào
                        trang giảng viên
                      </Link>
                      <Link
                        className="btn btn-microsoft btn-lg"
                        to="/dashboard">
                        <i className="fab fa-fw fa-microsoft" /> Vào trang Admin
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
