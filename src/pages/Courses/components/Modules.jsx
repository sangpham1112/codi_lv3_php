import React, { useRef, memo } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "~/components/Button";
import Input from "~/components/Input";
import MyEditor from "~/components/Editor";

const Modules = memo(({ modules, setModules }) => {
  const { setValue, handleSubmit, control } = useForm();
  const titleRef = useRef();

  const addModule = (data) => {
    setModules([...modules, data]);

    if (titleRef.current) {
      titleRef.current.focus();
    }
  };

  const deleteModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  return (
    <>
      <ol className="list-group list-group-numbered">
        {modules.map((module, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            key={index}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">{module.title}</div>
              <div dangerouslySetInnerHTML={{ __html: module.info }}></div>
            </div>
            <span
              className="badge badge-lg bg-danger rounded-pill"
              style={{ cursor: "pointer" }}
              onClick={() => deleteModule(index)}>
              xoá
            </span>
          </li>
        ))}
      </ol>
      <div className="card">
        <div className="card-body">
          <div className="card-title">Tạo module</div>
          <Input
            title="Tiêu đề module"
            name="title"
            ref={titleRef}
            onChange={(e) => setValue("title", e.target.value)}
          />
          <Controller
            name="info"
            control={control}
            render={({ field }) => (
              <MyEditor
                placeholder="Miêu tả module"
                className="form-control mb-3"
                style={{ height: "100px" }}
                {...field}
              />
            )}
          />
        </div>
        <div className="card-footer">
          <div className="w-25 mx-auto">
            <Button
              name="Thêm Module"
              btnColor="btn-success"
              isPrimary={false}
              type="submit"
              size="lg"
              onClick={handleSubmit(addModule)}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default Modules;
