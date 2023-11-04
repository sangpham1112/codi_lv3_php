import { useContext, useLayoutEffect } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSchedulesByStudent } from "../../api/Schedules";
import Table from "~/components/Table";
import Loading from "~/components/Loading";

const Student = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["schedules", id],
    queryFn: () => getSchedulesByStudent(id),
  });
  const schedulesStudent = data?.schedules;

  useLayoutEffect(() => {
    if (currentUser && currentUser.role_id !== 1 && currentUser.id !== id) {
      navigate("/student/" + currentUser.id);
    }
  }, [currentUser]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <>
      <Table
        title="Khoá đang học"
        isNeedEdit={false}
        tableHeader={["Tên khoá học", "Mã Lớp", "Lịch học", "Tiến độ"]}>
        {schedulesStudent.map((item, index) => {
          return (
            <tr>
              <td>#{++index}</td>
              <td>{item.course_name}</td>
              <td>{item.name}</td>
              <td>{item.schedule_time}</td>
              <td>
                {item.pass + "/" + item.duration}
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: (item.pass / item.duration) * 100 }}
                    aria-valuenow={(item.pass / item.duration) * 100}
                    aria-valuemin={0}
                    aria-valuemax={100}>
                    {(item.pass / item.duration) * 100}%
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
};

export default Student;
