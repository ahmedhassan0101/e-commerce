// import * as React from "react";

// import { cn } from "@/lib/utils";

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {
//   prefix?: React.ReactNode;
//   suffix?: React.ReactNode;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, prefix, suffix, ...props }, ref) => {
//     return (
//       <div
//         className={cn(
//           "flex items-center gap-1 h-9 w-full rounded-md border border-input bg-transparent px-1.5 text-sm shadow-sm transition-colors  has-[:focus-visible]:outline-none has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
//           className
//         )}
//       >
//         {prefix && <div className="flex items-center px-2">{prefix}</div>} //
//         Render prefix if available
//         <input
//           type={type}
//           ref={ref}
//           {...props}
//           className="flex-1 px-1 h-full focus:outline-none placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium"
//         />
//         {suffix && <div className="flex items-center px-2">{suffix}</div>} //
//         Render suffix if available
//       </div>
//     );
//   }
// );
// Input.displayName = "Input";

// export { Input };
import * as React from "react";

import { cn } from "@/lib/utils";
import { Separator } from "./separator";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "suffix"
  > {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  hasError?: string | boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, hasError, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center py-1 h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {prefix && (
          <div className="flex items-center h-full  text-gray-dark ">
            <div className="px-1.5 ">{prefix}</div>
            <Separator
              orientation="vertical"
              className={hasError ? "via-semantic-error" : ""}
            />
          </div>
        )}
        <input
          type={type}
          ref={ref}
          {...props}
          className="flex-1 px-1.5 py-1 h-full focus:outline-none placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium"
        />
        {suffix && (
          <div className="flex items-center h-full  text-gray-dark ">
            <div className="px-1.5 ">{suffix}</div>
            <Separator
              orientation="vertical"
              className={hasError ? "bg-semantic-error" : ""}
            />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
