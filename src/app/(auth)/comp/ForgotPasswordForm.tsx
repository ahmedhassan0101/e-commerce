"use client"
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FormikInput from "@/components/form/FormikInput";
import { Send } from "lucide-react";
import { authApi } from "@/utils/apiService";

interface ForgotPasswordData {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

const ForgotPasswordForm: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = async (values: ForgotPasswordData, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await authApi.forgotPassword(values);
      if (response.success) {
        toast({
          title: "Success",
          description: "If an account with that email exists, we have sent a password reset link.",
        });
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-sm grid gap-4">
          <FormikInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            prefix={<Send className="" />}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;