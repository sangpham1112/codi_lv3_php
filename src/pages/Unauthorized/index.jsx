import { useNavigate } from "react-router-dom";
import Button from "~/components/Button";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <main className="d-flex w-100 h-100">
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center">
                <h1 className="display-1 fw-bold">403</h1>
                <p className="h2">Bạn không có quyền vào trang này</p>
                <div className="w-25 mx-auto">
                  <Button name="Về trang chủ" onClick={() => navigate("/")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
