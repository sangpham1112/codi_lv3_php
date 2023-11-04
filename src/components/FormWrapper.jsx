import React, { memo } from "react";

const FormWrapper = memo(({ title, onSubmit, children }) => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
        <form onSubmit={onSubmit}>
          <div className="card-body">{children}</div>
        </form>
      </div>
    </>
  );
});

export default FormWrapper;
