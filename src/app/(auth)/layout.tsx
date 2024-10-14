import AuthProviders from "./comp/AuthProviders";
import { getProviders } from "next-auth/react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const providers = await getProviders();
  return (
    <section className="w-full h-screen flex max-lg:items-center max-lg:justify-center max-lg:px-5  max-lg:bg-[#771D40]">
      <div className="bg-[#771D40] flex-1 max-lg:hidden" />
      <div className="lg:flex-1 flex flex-col items-center gap-4 rounded-md shadow-md justify-center w-full max-lg:max-w-md bg-white px-4 py-8">
        <>
          {children}
          {providers ? (
            <AuthProviders providers={providers} />
          ) : (
            <p>No providers configured</p>
          )}
        </>
      </div>
    </section>
  );
}
