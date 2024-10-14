import * as Yup from "yup";
export interface AuthData {
  username?: string;
  email: string;
  password: string;
  conf_password?: string;
}
export const signupValidationSchema = Yup.object({
  username: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  conf_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Function to get initial values based on isSignUp
export const getInitialValues = (isSignUp: boolean | undefined): AuthData => {
  return isSignUp
    ? { username: "", email: "", password: "", conf_password: "" }
    : { email: "", password: "" };
};

// Function to get validation schema based on isSignUp
export const getValidationSchema = (isSignUp: boolean | undefined) => {
  return isSignUp ? signupValidationSchema : loginValidationSchema;
};
