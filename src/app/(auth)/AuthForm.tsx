"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FormikInput from "@/components/form/FormikInput";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { KeySquare, Send, User } from "lucide-react";

const signupValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
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

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
  conf_password?: string;
}

const AuthForm: React.FC<{ page: "login" | "signUp" }> = ({ page }) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const initialValues: AuthFormValues = page === "login" 
    ? { email: "", password: "" }
    : { name: "", email: "", password: "", conf_password: "" };

  const validationSchema = page === "login" ? loginValidationSchema : signupValidationSchema;

  const handleSubmit = async (
    values: AuthFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("values", values);
      toast({
        title: page === "login" ? "Login Successful" : "Registration Successful",
        description: page === "login" 
          ? "You have been logged in successfully!" 
          : "Your account has been created successfully!",
      });
      // Add redirection or other actions here
    } catch (error) {
      toast({
        title: page === "login" ? "Login Failed" : "Registration Failed",
        description: page === "login"
          ? "There was an error logging in. Please try again."
          : "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-sm grid gap-4">
          {page === "signUp" && (
            <FormikInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              prefix={<User className=""/>}
            />
          )}
          <FormikInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            prefix={<Send className=""/>}
          />
          <FormikInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            prefix={<KeySquare className=""/>}
          />
          {page === "signUp" && (
            <FormikInput
              name="conf_password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              prefix={<KeySquare className=""/>}
            />
          )}

          {page === "login" ? (
            <div className="flex flex-col justify-center items-center">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <div>
                Don't have an account?
                <Button
                  asChild
                  variant="link"
                  disabled={isSubmitting}
                  className="p-2"
                >
                  <Link href="/sign-up">Sign up</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating Account..." : "Create an Account"}
              </Button>
              <div>
                Already have an account?
                <Button
                  asChild
                  variant="link"
                  disabled={isSubmitting}
                  className="p-2"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;