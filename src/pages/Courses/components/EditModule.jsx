import React from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "~/components/Input";
import MyEditor from "~/components/Editor";

const EditModule = ({
  courseDetail,
  currentIndex,
  id,
  updateModulesMutation,
  currentModule,
}) => {
  //setDefault value khi field chưa có gì
  const { setValue, handleSubmit, control } = useForm({
    defaultValues: {
      title: "",
      info: "",
    },
  });

  const updateModule = (data) => {
    //copy courseDetail ko nên sửa trực tiếp vào state.
    const updatedCourseDetail = [...courseDetail];
    //lấy cái object hiện tại trong array copy rồi update lại.
    updatedCourseDetail[currentIndex] = {
      ...updatedCourseDetail[currentIndex],
      ...data,
    };
    updateModulesMutation.mutate({
      id,
      detail: JSON.stringify(updatedCourseDetail),
    });
  };

  //cập nhật field trong modal khi openModal
  React.useEffect(() => {
    if (currentModule) {
      for (const field in currentModule) {
        setValue(field, currentModule[field]);
      }
    }
  }, [currentModule, setValue]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Sửa
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input title="Tiêu đề module" {...field} />
              )}
            />
            <Controller
              control={control}
              name="info"
              render={({ field }) => (
                <MyEditor
                  placeholder="Miêu tả module"
                  className="form-control mb-3"
                  {...field}
                  style={{ height: "100px" }}
                />
              )}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit(updateModule)}>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditModule);
