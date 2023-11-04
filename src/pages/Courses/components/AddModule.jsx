import React, { memo } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import MyEditor from "~/components/Editor";
import { Controller, useForm } from "react-hook-form";

const AddModule = memo(({ courseDetail, id, updateModulesMutation }) => {
  const { setValue, handleSubmit, control } = useForm();
  const [isOpenAddMore, setIsOpenAddMore] = React.useState(false);
  const titleRef = React.useRef();

  const addModule = (data) => {
    const newModules = [...courseDetail, data];
    updateModulesMutation.mutate({
      id,
      detail: JSON.stringify(newModules),
    });
    setValue("title", "");
    setValue("info", "");
    if (titleRef.current) {
      titleRef.current.focus();
    }
  };

  const handleAddMoreBtn = () => {
    setIsOpenAddMore(!isOpenAddMore);
  };
  return (
    <>
      {isOpenAddMore && (
        <form className="card">
          <div className="card-body">
            <div className="card-title">Tạo module</div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  title="Tiêu đề module"
                  ref={titleRef}
                  {...field}
                  onChange={(e) => setValue("title", e.target.value)}
                />
              )}
            />
            <Controller
              name="info"
              control={control}
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
          <div className="card-footer">
            <Button
              name="Thêm Module"
              btnColor="btn-success"
              isPrimary={false}
              type="submit"
              onClick={handleSubmit(addModule)}
            />
          </div>
        </form>
      )}
      <div className="w-25 mx-auto">
        <Button
          name={isOpenAddMore ? "Đóng" : "Add thêm module"}
          onClick={handleAddMoreBtn}
          isPrimary={false}
          btnColor={isOpenAddMore ? "btn-danger" : "btn-info"}
        />
      </div>
    </>
  );
});

export default AddModule;
