import React, { memo } from "react";

const Loading = memo(() => {
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
});

export default Loading;
