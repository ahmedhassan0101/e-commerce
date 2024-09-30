import React from "react";
import { useField, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormikInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const FormikInput: React.FC<FormikInputProps> = ({
  label,
  prefix,
  suffix,
  ...props
}) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;
  return (
    <div className="space-y-1">
      <Label htmlFor={props.name} className="text-sm-semi-dark">
        {label}
      </Label>
      <Input
        {...field}
        {...props}
        suffix={suffix}
        prefix={prefix}
        id={props.name}
        hasError={hasError}
        className={
          hasError
            ? "border-semantic-error focus-visible:ring-semantic-error focus-within:ring-semantic-error"
            : ""
        }
      />
      <ErrorMessage
        name={props.name}
        component="div"
        className="text-semantic-error text-sm mt-1"
      />
    </div>
  );
};

export default FormikInput;
