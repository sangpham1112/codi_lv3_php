import React, { memo } from "react";

const Input = memo(
  React.forwardRef(
    (
      {
        children,
        title = "",
        type = "text",
        name = "",
        placeholder = "",
        className = "form-control form-control-lg",
        ...props
      },
      ref
    ) => {
      return (
        <div className="mb-3">
          <label className="form-label">{title}</label>
          <input
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          {children}
        </div>
      );
    }
  )
);

export default Input;
