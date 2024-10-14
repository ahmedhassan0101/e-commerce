"use client"
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '../comp/ResetPasswordForm';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return <div>Invalid or missing token. Please request a new password reset link.</div>;
  }

  return <ResetPasswordForm token={token} />;
}