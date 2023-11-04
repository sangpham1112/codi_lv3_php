import { memo } from "react";

const MostPopularCourses = memo(({ mostPopularCourses }) => {
  return (
    <div className="card flex-fill">
      <div className="card-header">
        <h5 className="card-title mb-0">Những khoá học nhiều nhất</h5>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>Tên khoá học</th>
            <th className="d-xxl-table-cell">Số lượng học viên</th>
          </tr>
        </thead>
        <tbody>
          {mostPopularCourses?.map((item, index) => {
            return (
              <tr className="text-center" key={index}>
                <td>
                  <div className="d-flex">
                    <div className="flex-grow-1 ms-3">
                      <span>{item.name}</span>
                    </div>
                  </div>
                </td>
                <td className="d-xxl-table-cell">
                  <span>{item.student_count}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default MostPopularCourses;
