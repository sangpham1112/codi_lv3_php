import { memo } from "react";
import { formatPrice } from "~/utils/formatPrice";

const TopNumbers = memo(
  ({ totalCourses, totalStudents, totalTeachers, totalPrice }) => {
    return (
      <>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">Tài chính</h5>
                </div>
                <div className="col-auto">
                  <div className="stat text-primary">
                    <i className="fa-solid fa-dollar-sign"></i>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">{formatPrice(totalPrice)}</h1>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">Giảng viên</h5>
                </div>
                <div className="col-auto">
                  <div className="stat text-primary">
                    <i className="fa-solid fa-chalkboard-user"></i>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">{totalTeachers}</h1>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">Học viên</h5>
                </div>
                <div className="col-auto">
                  <div className="stat text-primary">
                    <i className="fa-solid fa-user"></i>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">{totalStudents}</h1>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">Khoá học</h5>
                </div>
                <div className="col-auto">
                  <div className="stat text-primary">
                    <i className="fa-solid fa-book"></i>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">{totalCourses}</h1>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default TopNumbers;
