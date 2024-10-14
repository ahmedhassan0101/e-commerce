// "use client"
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import FormikInput from "@/components/form/FormikInput";
import { KeySquare } from "lucide-react";
import { authApi } from "@/utils/apiService";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (
    values: ResetPasswordData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const { data, message, success } = await authApi.resetPassword({
        ...values,
        token,
      });
      if (success && data) {
        console.log("ResetPasswordForm", data)
        toast({
          title: "Success",
          description: message || "Your password has been reset successfully.",
        });

        // Attempt to sign in the user
        const result = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: values.password,
        });

        if (result?.error) {
          toast({
            title: "Warning",
            description:
              "Password reset successful, but automatic login failed. Please log in manually.",
            variant: "destructive",
          });
          router.push("/login");
        } else {
          router.push("/");
        }
      } else {
        toast({
          title: "Error",
          description:
            message || "An error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
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
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-sm grid gap-4">
          <FormikInput
            name="password"
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            prefix={<KeySquare className="" />}
          />
          <FormikInput
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm your new password"
            prefix={<KeySquare className="" />}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
