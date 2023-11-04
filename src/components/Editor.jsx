import React, { useMemo, memo } from "react";
import JoditEditor from "jodit-react";

const MyEditor = memo(
  React.forwardRef(({ placeholder, name, ...props }, ref) => {
    const config = useMemo(
      () => ({
        readonly: false,
        placeholder: placeholder || "Start typing...",
      }),
      [placeholder]
    );

    return (
      <JoditEditor
        ref={ref}
        // value={content}
        config={config}
        tabIndex={1}
        {...props}
      />
    );
  })
);
export default MyEditor;
