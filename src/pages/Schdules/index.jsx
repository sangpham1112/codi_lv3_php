import { useSearchParams } from "react-router-dom";
import { deleteSchedule, getSchedules } from "../../api/Schedules";
import Button from "~/components/Button";
import Table from "~/components/Table";
import Pagination from "~/components/Pagination";
import Loading from "~/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useCustomMutate } from "~/hooks/useCustomMutate";

const Schedules = () => {
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");
  let query = searchParams.get("query");

  const { data, error, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["schedules", page, query],
    queryFn: () => getSchedules(page, query),
    keepPreviousData: true,
  });
  // Delete Course
  const { mutation: deleteScheduleMutation } = useCustomMutate(
    "schedules",
    deleteSchedule
  );

  const handleDeleteSchedule = (id) => {
    if (confirm("Bạn có muốn xoá lớp ?")) {
      deleteScheduleMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <span>{error}</span>;
  }

  const schedules = data?.schedules.data;
  console.log(schedules);
  return (
    <>
      <Table
        isSearch={true}
        title="Bảng lớp học"
        tableHeader={["Tên", "Môn học", "Lịch học", "Giảng viên"]}>
        {schedules?.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <strong>#{++index}</strong>
              </td>
              <td>{item.name}</td>
              <td>{item.course.name}</td>
              <td>{item.schedule_time}</td>
              <td>{item.user.name}</td>
              <td className="d-flex justify-content-evenly">
                <Button name="xem" to={"/schedules/" + item.id} />
                <Button
                  name="xoá"
                  isPrimary={false}
                  btnColor="btn-danger"
                  onClick={() => handleDeleteSchedule(item.id)}
                />
              </td>
            </tr>
          );
        })}
      </Table>
      {data?.schedules.last_page > 1 && (
        <Pagination
          isPreviousData={isPreviousData}
          data={schedules}
          lastPage={data?.schedules.last_page}
          currentPage={page}
        />
      )}
    </>
  );
};

export default Schedules;
