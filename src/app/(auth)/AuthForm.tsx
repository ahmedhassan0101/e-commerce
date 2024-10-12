"use client";

import React from "react";
import { Formik, Form } from "formik";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FormikInput from "@/components/form/FormikInput";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { KeySquare, Send, User } from "lucide-react";
import { authApi } from "@/utils/apiService";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AuthData,
  getInitialValues,
  getValidationSchema,
} from "./sign-up/constants";
interface SubmitOptions {
  setSubmitting: (isSubmitting: boolean) => void;
}

type HandleSubmit = (values: AuthData, options: SubmitOptions) => Promise<void>;

const AuthForm: React.FC<{ isSignUp?: boolean }> = ({ isSignUp }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const initialValues = getInitialValues(isSignUp);
  const validationSchema = getValidationSchema(isSignUp);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const handleSubmit: HandleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      if (isSignUp) {
        const { success, data, message } = await authApi.signUp(values);
        if (success && data) {
          toast({
            title: "Success",
            description:
              message ||
              "Account created successfully. Please check your email to verify your account.",
          });
          const signInResult = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });

          if (signInResult?.error) {
            toast({
              title: "Warning",
              description:
                "Account created, but automatic login failed. Please log in manually.",
              variant: "destructive",
            });
            router.push("/login");
          } else {
            router.push(callbackUrl);
          }
        } else {
          toast({
            title: "Error",
            description: message || "An error occurred during sign up.",
            variant: "destructive",
          });
        }
      } else {
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl,
        });
        if (result?.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          router.push(callbackUrl);
        }
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description:
          error.message || "An unexpected error occurred. Please try again.",
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
          {isSignUp && (
            <FormikInput
              name="username"
              label="Name"
              placeholder="Enter your name"
              prefix={<User className="" />}
            />
          )}
          <FormikInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            prefix={<Send className="" />}
          />
          <FormikInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            prefix={<KeySquare className="" />}
          />
          {isSignUp && (
            <FormikInput
              name="conf_password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              prefix={<KeySquare className="" />}
            />
          )}

          {!isSignUp ? (
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