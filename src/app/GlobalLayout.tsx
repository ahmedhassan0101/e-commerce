"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/Header/comp/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/utils/theme-provider";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPages = ["login", "sign-up"].some((path) =>
    pathname?.startsWith(`/${path}`)
  );

  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          {!isAuthPages && <Navbar />}
          {children}
          {!isAuthPages && <Footer />}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
