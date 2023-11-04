import React from "react";
import FormWrapper from "~/components/FormWrapper";
import Input from "~/components/Input";
import Button from "~/components/Button";
import Select from "~/components/Select";

const CreateTeacher = () => {
  const submit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <FormWrapper title="Thêm giáo viên" onSubmit={submit}>
      <div className="row">
        <div className="col-md-6">
          <Input
            title="Tên và Họ"
            type="text"
            name="name"
            placeholder="Họ tên giảng viên"
          />
        </div>
        <div className="col-md-6">
          <Input
            title="Số điện thoại"
            type="text"
            name="name"
            placeholder="Tên giảng viên"
          />
        </div>
        <div className="col-md-6">
          <Input
            title="Email"
            type="email"
            name="email"
            placeholder="Email giảng viên"
          />
        </div>
        <div className="col-md-6">
          <Input
            title="Địa chỉ"
            type="text"
            name="address"
            placeholder="Địa chỉ giảng viên"
          />
        </div>

        <div className="col-md-6">
          <Input title="Ngày sinh" type="date" name="birthDay" />
        </div>
      </div>

      <Button name="Thêm giảng viên" type="submit" size="lg" />
    </FormWrapper>
  );
};

export default CreateTeacher;
