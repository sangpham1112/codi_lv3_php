import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Button = memo(
  ({ name, isPrimary = true, btnColor = "", size = "sm", ...props }) => {
    const sizes = { sm: " btn-sm", lg: " btn-lg" };

    if (props.to) {
      const navigate = useNavigate();
      const handleNavigate = (to) => {
        navigate(to);
      };

      return (
        <div className="d-grid gap-2 mt-3">
          <button
            className={
              "btn " + (isPrimary ? "btn-primary" : btnColor) + sizes[size]
            }
            onClick={() => handleNavigate(props.to)}
            {...props}>
            {name}
          </button>
        </div>
      );
    }

    return (
      <div className="d-grid gap-2 mt-3">
        <button
          className={
            "btn " + (isPrimary ? "btn-primary" : btnColor) + sizes[size]
          }
          {...props}>
          {name}
        </button>
      </div>
    );
  }
);

export default Button;
