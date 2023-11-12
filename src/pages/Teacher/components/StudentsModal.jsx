import { memo, useState } from "react";
import Table from "~/components/Table";
import Select from "~/components/Select";
import Button from "~/components/Button";
import { updateScore } from "../../../api/Teachers";
import { useForm } from "react-hook-form";
import { useCustomMutate } from "~/hooks/useCustomMutate";

const StudentsModal = memo(({ studentsInClass, isFinish }) => {
  console.log(isFinish);
  return (
    <div
      className="modal fade"
      id="HVModal"
      tabIndex={-1}
      aria-labelledby="HVModalLabel"
      aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="HVModalLabel">
              Danh sách sinh viên
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <Table
              tableHeader={["Tên học viên", "Điểm", "Học lực"]}
              isNeedEdit={false}>
              {studentsInClass.map((student, index) => (
                <StudentRow
                  student={student}
                  index={index}
                  isFinish={isFinish}
                />
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
});

export function StudentRow({ student, index, isFinish }) {
  const [isEdit, setIsEdit] = useState(false);
  const { handleSubmit, setValue } = useForm();

  const { mutation: updateScoreMutation } = useCustomMutate(
    "schedules",
    updateScore
  );

  const handleUpdateScore = (data) => {
    updateScoreMutation.mutate({ id: student.id, data });
    setTimeout(() => {
      setIsEdit(false);
    }, 1100);
  };

  return (
    <tr key={student.id}>
      <td>#{index + 1}</td>
      <td>{student.user.name}</td>
      <td>
        {isEdit && isFinish ? (
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit(handleUpdateScore)}>
            <Select
              optionData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              onChange={(e) => setValue("score", e.target.value)}>
              {(item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              )}
            </Select>
            <div className="d-flex justify-content-between">
              <Button name="xác nhận" type="submit" />
              <Button
                name="Huỷ"
                isPrimary={false}
                btnColor="btn-danger"
                onClick={() => setIsEdit(false)}
              />
            </div>
          </form>
        ) : (
          <>
            <span className="fw-bold fs-4 mb-2">
              {student.score ?? "Chưa có điểm"}
            </span>
            {isFinish && (
              <div
                className="ms-1 badge bg-primary d-block"
                onClick={() => setIsEdit(true)}
                style={{ cursor: "pointer" }}>
                Cập nhật
              </div>
            )}
          </>
        )}
      </td>
      <td>
        {student.score
          ? student.score < 5
            ? "Yếu"
            : student.score == 5
            ? "Trung Bình"
            : student.score > 5 && student.score < 8
            ? "Khá"
            : "Giỏi"
          : "Chưa xếp loại"}
      </td>
    </tr>
  );
}

export default StudentsModal;
