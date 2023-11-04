import React, { memo } from "react";

const AlertError = memo(({ mess }) => {
  return (
    <>
      <div className="alert alert-danger" role="alert">
        <div className="alert-message">
          <strong className="text-danger">{mess}</strong>
        </div>
      </div>
    </>
  );
});

export default AlertError;
