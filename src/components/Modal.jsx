import React, { useEffect, memo } from "react";
import Button from "~/components/Button";

const Modal = memo(
  ({ title, children, onSubmit, name = "Sửa", id = "Modal", ...props }) => {
    useEffect(() => {
      if (props.isSuccess) {
        const submitBtn = document.getElementById("submitModalBtn");
        submitBtn.setAttribute("data-bs-dismiss", "modal");
        return () => submitBtn.removeAttribute("data-bs-dismiss");
      }
    }, [props.isSuccess]);

    return (
      <>
        <Button name={name} data-bs-toggle="modal" data-bs-target={"#" + id} />
        <div
          className="modal fade"
          id={id}
          tabIndex={-1}
          role="dialog"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <form className="modal-content" onSubmit={onSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body m-3">{children}</div>
              <div className="modal-footer">
                <Button
                  name="Đóng"
                  btnColor="btn-secondary"
                  data-bs-dismiss="modal"
                  isPrimary={false}
                  size="lg"
                  type="button"
                />
                <Button
                  id="submitModalBtn"
                  name="Lưu"
                  btnColor="btn-secondary"
                  size="lg"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
);

export default Modal;
