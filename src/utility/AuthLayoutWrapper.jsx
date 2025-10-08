"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DotLoader from "@/components/DotLoader/DotLoader";
import Cookies from "js-cookie";

export default function AuthLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const accessToken = Cookies.get("hrms_access_token");
  const isAuthenticated = !!accessToken;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <main className="padding-bottom">{children}</main>
    </>
  );
}
